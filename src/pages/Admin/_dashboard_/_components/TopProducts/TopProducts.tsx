import { FallOutlined, QuestionCircleOutlined, RiseOutlined } from '@ant-design/icons';
import { ConfigProvider, Space, Table, TableProps, Tabs, TabsProps, Tooltip, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WrapperList from '~/components/_common/WrapperList';
import { MAIN_ROUTES } from '~/constants/router';
import DateRangePickerComponent from '../Charts/RangePicker/DateRangePickerComponent';
import { Currency } from '~/utils';
import { Image } from 'antd/lib';
import useGetProductStatsByRange from '~/hooks/queries/stats/useGetProductStatsByRange';

const { Text, Title } = Typography;

type DataType = {
    '#': number;
    _id: string;
    name: string;
    image: string;
    price: number;
    totalQuantity: number;
    totalRevenue: number;
    percentageOfTotal: number;
    percentageOfAllProducts: number;
    details: string;
};

type ProductDataType = {
    _id: string;
    name: string;
    image: string;
    price: number;
    totalQuantity: number;
    totalRevenue: number;
    percentageOfTotal: number;
    percentageOfAllProducts: number;
};

export const TopProducts: React.FC = () => {
    const today = dayjs();
    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([today, today]);
    const { data, isLoading, error } = useGetProductStatsByRange(dateRange[0], dateRange[1]);
    const topSellingProducts = data?.data?.topSellingProducts;
    const leastSellingProducts = data?.data?.leastSellingProducts;

    const [tableData, setTableData] = useState<DataType[]>(topSellingProducts || []);
    const [currentTab, setCurrentTab] = useState('top products');

    const handleDateRangeChange = (dates: [Dayjs, Dayjs] | null) => {
        if (dates && dates[0] && dates[1]) {
            setDateRange(dates);
        } else {
            setDateRange([today, today]);
        }
    };

    const dataTable = () => {
        const columns: TableProps<DataType>['columns'] = [
            {
                title: <span className='text-sm font-semibold text-gray-900'>#</span>,
                dataIndex: '#',
                key: '#',
                align: 'center',
                width: '5%',
                render: (_, __, index) => <div className='text-center font-semibold text-blue-600'>{index + 1}</div>,
            },
            {
                title: <span className='text-sm font-semibold text-gray-900'>Chi tiết sản phẩm</span>,
                dataIndex: 'details',
                key: 'details',
                width: '40%',
                render: (_, product: ProductDataType) => (
                    <Space size={12} align='center'>
                        <Image
                            src={product.image}
                            alt={product.name}
                            className='rounded-lg border border-gray-200 shadow-sm transition-transform duration-200 hover:scale-105'
                            preview={false}
                            style={{ width: '46px', height: '46px', objectFit: 'contain' }}
                        />
                        <div>
                            <Link
                                to={`${MAIN_ROUTES}/${product._id}`}
                                className='text-sm font-semibold text-gray-900 transition-colors hover:text-blue-600'
                            >
                                {product.name}
                            </Link>
                            <div className='text-xs text-gray-600'>{Currency.format(product.price)}</div>
                        </div>
                    </Space>
                ),
            },
            {
                title: (
                    <Tooltip title='Số lượng sản phẩm đã bán' color='blue'>
                        <span className='text-sm font-semibold text-gray-900'>
                            Đã bán <QuestionCircleOutlined className='ml-1 text-gray-500' />
                        </span>
                    </Tooltip>
                ),
                dataIndex: 'totalQuantity',
                key: 'totalQuantity',
                align: 'center',
                width: '15%',
                render: (text) => <div className='text-center font-medium text-gray-800'>{text}</div>,
            },
            {
                title: (
                    <Tooltip title='Số tiền kiếm được' color='blue'>
                        <span className='text-sm font-semibold text-gray-900'>
                            Doanh thu <QuestionCircleOutlined className='ml-1 text-gray-500' />
                        </span>
                    </Tooltip>
                ),
                dataIndex: 'totalRevenue',
                key: 'totalRevenue',
                align: 'center',
                width: '20%',
                render: (text) => <div className='text-center font-medium text-gray-800'>{Currency.format(text)}</div>,
            },
            {
                title: (
                    <Tooltip title='Số lượng bán ra chia cho toàn bộ số lượng sản phẩm còn tồn kho' color='blue'>
                        <span className='text-sm font-semibold text-gray-900'>
                            % Tồn kho <QuestionCircleOutlined className='ml-1 text-gray-500' />
                        </span>
                    </Tooltip>
                ),
                dataIndex: 'percentageOfAllProducts',
                key: 'percentageOfAllProducts',
                align: 'center',
                width: '20%',
                render: (percent) => (
                    <Text className='text-center font-medium text-gray-800'>{parseFloat(percent).toFixed(2)}%</Text>
                ),
            },
        ];

        if (!isLoading && tableData.length === 0) {
            return <div className='py-6 text-center text-gray-500'>Không có dữ liệu để hiển thị</div>;
        }

        return (
            <Table
                columns={columns}
                loading={isLoading}
                dataSource={tableData?.map((item, index) => ({ ...item, '#': index + 1, key: item._id, details: '' }))}
                pagination={false}
                className='overflow-hidden rounded-lg border border-gray-200 shadow-sm'
                rowClassName='transition-colors duration-200 hover:bg-blue-50'
            />
        );
    };

    const items: TabsProps['items'] = [
        {
            key: 'top products',
            label: (
                <Space className='text-sm font-semibold text-gray-700'>
                    <RiseOutlined className='text-green-600' />
                    Sản phẩm bán chạy
                </Space>
            ),
            children: dataTable(),
        },
        {
            key: 'worst products',
            label: (
                <Space className='text-sm font-semibold text-gray-700'>
                    <FallOutlined className='text-red-600' />
                    Sản phẩm bán chậm
                </Space>
            ),
            children: dataTable(),
        },
    ];

    const onChange = (key: string) => {
        setCurrentTab(key);
        if (key === 'top products') {
            setTableData(topSellingProducts || []);
        } else {
            setTableData(leastSellingProducts || []);
        }
    };

    useEffect(() => {
        if (!dateRange[0] || !dateRange[1]) {
            setDateRange([today, today]);
        }
    }, []);

    useEffect(() => {
        if (currentTab === 'top products') {
            setTableData(topSellingProducts || []);
        } else {
            setTableData(leastSellingProducts || []);
        }
    }, [currentTab, topSellingProducts, leastSellingProducts]);

    if (error) {
        return <div className='py-6 text-center text-red-500'>Lỗi: {error.message || 'Không thể tải dữ liệu'}</div>;
    }

    return (
        <WrapperList
            title={
                <Title level={3} className='mb-0 font-semibold text-gray-900'>
                    Thống kê sản phẩm
                </Title>
            }
            option={<DateRangePickerComponent onDateRangeChange={handleDateRangeChange} value={dateRange} />}
            lineButtonBox
            className='rounded-xl bg-white p-6 shadow-sm'
        >
            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            itemHoverColor: '#2563EB',
                            itemSelectedColor: '#2563EB',
                            itemColor: '#6B7280',
                            titleFontSize: 14,
                            inkBarColor: '#2563EB',
                            horizontalItemPadding: '12px 16px',
                        },
                        Table: {
                            headerBg: '#DBEAFE',
                            headerColor: '#1F2937',
                            rowHoverBg: '#EFF6FF',
                            borderColor: '#E5E7EB',
                        },
                    },
                    token: {
                        colorPrimary: '#2563EB',
                        borderRadius: 6,
                        fontFamily: 'Inter, sans-serif',
                    },
                }}
            >
                <Tabs
                    tabBarStyle={{
                        background: '#FFFFFF',
                        padding: '0 16px',
                        borderBottom: '1px solid #E5E7EB',
                        marginBottom: 0,
                    }}
                    defaultActiveKey='top products'
                    items={items}
                    onChange={onChange}
                />
            </ConfigProvider>
        </WrapperList>
    );
};

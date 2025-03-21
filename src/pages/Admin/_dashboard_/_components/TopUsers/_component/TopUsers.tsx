import { Button, Card, ConfigProvider, Table, Typography } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import WrapperList from '~/components/_common/WrapperList';
import DateRangePickerCard from '../../DatePickerCard/DateRangePickerCard';
import LatestOrders from './LatestOrders';
import { columns } from '../_option';
import { OrderStatus } from '~/constants/enum';
import { useTopBuyers } from '~/hooks/queries/stats/useTopBuyers';

const { Title } = Typography;

type DateInput =
    | { type: 'range'; start: string; end: string }
    | { type: 'monthly'; year: number; month: number }
    | { type: 'yearly'; year: number };

const TopUsers: React.FC = () => {
    const [dateInput, setDateInput] = useState<DateInput>({
        type: 'range',
        start: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
        end: dayjs().format('YYYY-MM-DD'),
    });

    const { data: topBuyersData, isLoading, error } = useTopBuyers(dateInput);

    if (isLoading) return <div className='flex h-screen items-center justify-center'>Loading...</div>;
    if (error)
        return <div className='flex h-screen items-center justify-center text-red-500'>Error: {error.message}</div>;

    if (!topBuyersData || !topBuyersData.topBuyers) {
        return <div className='flex h-screen items-center justify-center'>No data available</div>;
    }

    const handleDateChange = (newDateInput: DateInput) => {
        setDateInput(newDateInput);
    };

    const tableData = topBuyersData.topBuyers.map((buyer: any, index: number) => ({
        ...buyer,
        key: buyer._id,
        index: index + 1,
    }));

    return (
        <WrapperList
            title='Thống kê khách hàng'
            lineButtonBox
            option={<DateRangePickerCard onDateChange={handleDateChange} initialDate={dateInput} />}
        >
            <Card
                title={<Typography.Title level={4}>Đơn hàng gần đây</Typography.Title>}
                extra={
                    <Button type='link'>
                        <Link to='/admin/orders'>Xem tất cả</Link>
                    </Button>
                }
                className='mb-8'
            >
                {topBuyersData.latestOrders && <LatestOrders orders={topBuyersData.latestOrders} />}
            </Card>

            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            itemHoverColor: '#1890ff',
                            itemSelectedColor: '#1890ff',
                            itemColor: '#595959',
                            titleFontSize: 16,
                        },
                    },
                    token: {
                        colorPrimary: '#1890ff',
                        borderRadius: 4,
                    },
                }}
            >
                <Card title={<Title level={4}>Top 5 khách hàng</Title>}>
                    <Table columns={columns} dataSource={tableData} pagination={false} />
                </Card>
            </ConfigProvider>
        </WrapperList>
    );
};

export default TopUsers;

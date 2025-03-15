import { PlusOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { ADMIN_ROUTES } from '~/constants/router';
import useTable from '~/hooks/_common/useTable';
import TableDisplay from '~/components/_common/TableDisplay';
import { TableProps } from 'antd/lib';
import { useGetAllProductForAdmin } from '~/hooks/queries/products/useGetAllProductForAdmin';
import { IProduct } from '~/types/Product';
import { IVariant } from '~/types/Variant';
import { Currency } from '~/utils';
import WrapperPageAdmin from '../_common';
import { useGetAllCate } from '~/hooks/queries/categories/useGetAllCate';

const ProductList = () => {
    const { onSelectPaginateChange, query, onFilter, getColumnSearchProps, getFilteredValue, getSortedInfo } =
        useTable<IProduct>();
    const currentPage = Number(query.page || 1);
    const { data } = useGetAllProductForAdmin(query);
    const { data: categories } = useGetAllCate();
    const totalDocs = data?.totalDocs || 0;
    const categoriesDataFilter = (categories?.map((el) => [{ name: el.name, _id: el._id }, ...el.items]).flat() || [])
        .reduce(
            (acc, curr) => {
                if (acc.some((item) => item._id === curr._id)) return acc;
                return [...acc, { name: curr.name, _id: curr._id }];
            },
            [] as { _id: string; name: string }[]
        )
        .map((el) => ({ text: el.name, value: el._id }));

    const getStockStatus = (stock: number) => {
        if (stock === 0) return { color: 'red', text: 'Hết hàng' };
        if (stock < 10) return { color: 'orange', text: 'Sắp hết' };
        return { color: '', text: 'Sản phẩm' };
    };

    const columns: TableProps<IProduct>['columns'] = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'search',
            width: '35%',
            ...getColumnSearchProps('name'),
            render: (text, record) => (
                <>
                    <div className='flex items-center gap-3'>
                        <img
                            src={record.thumbnail}
                            className='h-16 w-16 rounded-lg object-cover shadow-sm'
                            alt={record.name}
                        />
                        <div className='flex-1'>
                            <h4 className='max-w-[300px] truncate text-lg font-medium text-gray-800'>{text}</h4>
                            <p className='text-xs text-gray-500'>ID: {record.code}</p>
                        </div>
                    </div>

                    <div className='mt-4 space-y-3'>
                        {record.variants.map((item, index) => (
                            <div className='flex items-center gap-3 rounded-md bg-gray-50 p-2' key={index}>
                                <div className='relative'>
                                    <div
                                        className='h-8 w-8 rounded-full shadow-inner'
                                        style={{
                                            backgroundColor: item.color.hex,
                                            border: '2px solid #fff',
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                        }}
                                    />
                                    <Tooltip title={`Màu: ${item.color.name}`}>
                                        <img
                                            src={item.color.image}
                                            className='absolute top-0 left-0 h-8 w-8 rounded-full object-cover opacity-50 transition-opacity hover:opacity-100'
                                            alt={record.name + item.color.name}
                                        />
                                    </Tooltip>
                                </div>
                                <div className='flex-1'>
                                    <p className='text-sm font-medium text-gray-700'>{item.color.name}</p>
                                    <div className='mt-1 flex flex-wrap gap-1'>
                                        {item.items.map((att, idx) => (
                                            <Tag key={idx} className='m-0' color={att.stock > 0 ? 'blue' : 'red'}>
                                                {att.size.value}: {att.stock}
                                            </Tag>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ),
        },
        {
            title: 'Đã bán',
            key: 'sold',
            dataIndex: 'sold',
            width: '10%',
            sortOrder: getSortedInfo('sold'),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            sorter: (a: any, b: any) => a.sold - b.sold,
            render: (sold) => <div className='text-center'>{sold.toLocaleString('de-DE')}</div>,
            responsive: ['md'],
        },
        {
            title: 'Giá tiền',
            key: 'price',
            dataIndex: 'price',
            sortOrder: getSortedInfo('price'),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            sorter: (a: any, b: any) => a.sold - b.sold,
            width: '15%',
            render: (price) => (
                <div className='text-right'>
                    <span className='text-lg font-medium text-green-600'>{Currency.format(price)}</span>
                    <p className='text-xs text-gray-500'>VNĐ</p>
                </div>
            ),
        },
        {
            title: 'Kho hàng',
            key: 'stock',
            dataIndex: 'variants',
            width: '15%',
            render: (variants) => {
                const totalStock = variants.reduce((acc: number, curr: IVariant) => {
                    return acc + curr.items.reduce((accSub, currSub) => accSub + currSub.stock, 0);
                }, 0);

                const status = getStockStatus(totalStock);

                return (
                    <div>
                        <div className='flex items-center gap-3'>
                            <div className='flex-1'>
                                {totalStock || 0} - {status.text}
                            </div>
                        </div>

                        <div className='mt-4 space-y-3'>
                            {variants.map((el: IVariant) => {
                                const stockColor = el.items.reduce((accSub, currSub) => accSub + currSub.stock, 0);
                                const colorStatus = getStockStatus(stockColor);
                                return (
                                    <div
                                        className='flex items-center gap-3 rounded-md bg-gray-50 p-5'
                                        key={el.color._id}
                                    >
                                        <div className='relative'>
                                            <div className='flex items-center gap-2'>
                                                <div
                                                    className='h-3 w-3 rounded-full'
                                                    style={{ backgroundColor: el.color.hex }}
                                                />
                                            </div>
                                        </div>
                                        <div className='flex-1'>
                                            <div className='mt-1 flex flex-wrap gap-1'>
                                                <span className={`text-${colorStatus.color}-600 text-sm`}>
                                                    {stockColor || 0}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            },
        },
        {
            title: 'Danh mục',
            key: 'categories',
            width: '15%',
            filteredValue: getFilteredValue('categories'),
            filters: categoriesDataFilter,
            render: (value, record) => {
                console.log(record.categories);
                return <h4>{record.categories.map((item) => item.name).join(' / ')}</h4>;
            },
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: '10%',
            render: (value, record) => (
                <Space className='flex flex-col items-start gap-2'>
                    <Tooltip title='Cập nhật'>
                        <Link
                            to={`${ADMIN_ROUTES.PRODUCTS_EDIT}/${record._id}`}
                            className='inline-flex items-center rounded-md px-3 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700'
                        >
                            Cập nhật
                        </Link>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <WrapperPageAdmin
            title='Quản lý sản phẩm'
            option={
                <Link to={ADMIN_ROUTES.PRODUCTS_CREATE}>
                    <Button icon={<PlusOutlined />} type='primary' size='large' className='hover:opacity-90'>
                        Thêm mới sản phẩm
                    </Button>
                </Link>
            }
        >
            <TableDisplay<IProduct>
                onFilter={onFilter}
                columns={columns}
                currentPage={currentPage}
                dataSource={data?.data || []}
                onSelectPaginateChange={onSelectPaginateChange}
                totalDocs={totalDocs}
            />
        </WrapperPageAdmin>
    );
};

export default ProductList;

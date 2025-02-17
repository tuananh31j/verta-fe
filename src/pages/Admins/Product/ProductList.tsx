/* eslint-disable @typescript-eslint/no-shadow */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Tag, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { ADMIN_ROUTES } from '~/constants/router';
import WrapperPageAdmin from '~/pages/Admins/_common/WrapperPageAdmin';
import useTable from '~/hooks/_common/useTable';
import TableDisplay from '~/components/_common/TableDisplay';
import { TableProps } from 'antd/lib';
import { useGetAllProductForAdmin } from '~/hooks/queries/products/useGetAllProductForAdmin';

const ProductList = () => {
    const { onSelectPaginateChange, query, onFilter, getColumnSearchProps, getFilteredValue } = useTable<any>();
    const currentPage = Number(query.page || 1);
    const { data } = useGetAllProductForAdmin(query);
    console.log(data);

    const columns: TableProps<any>['columns'] = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'search',
            width: '30%',
            ...getColumnSearchProps('name'),
            render: (text, record) => (
                <>
                    <div className='flex items-center gap-2'>
                        <div>
                            <img src={record.thumbnail} className='h-10 w-10 object-cover' alt={record.name} />
                        </div>
                        <div>
                            <h4 className='max-w-[300px] truncate'>{text}</h4>
                            <p className='text-[10px]'>ID: {record._id}</p>
                        </div>
                    </div>
                    <div className='border-graydark border-opacity-10 ms-7 mt-1 border-s-4 p-5'>
                        {/* {record.variationIds.map((item, index) => (
                            <div className='my-4 flex items-center gap-2' key={index}>
                                <div>
                                    <img src={item.image} className='h-8 w-8 object-cover' alt={record.name + index} />
                                </div>
                                <div>
                                    <p className='text-[10px]'>
                                        {item.variantAttributes.map((att) => att.value).join(', ')}
                                    </p>
                                </div>
                                <div className='ms-2'>
                                    {item.isActive && (
                                        <Tag className='text-[10px]' color='blue'>
                                            Đang bán
                                        </Tag>
                                    )}
                                    {!item.isActive && <Tag className='text-[10px]'>Đang không bán</Tag>}
                                </div>
                            </div>
                        ))} */}
                    </div>
                </>
            ),
        },
        {
            title: 'Đã bán',
            key: 'sold',
            render: (_, record) => (
                <>
                    <div className='flex flex-col justify-between'>
                        {/* <p className='h-14'>{record.variationIds.reduce((acc, curr) => acc + (curr.sold || 0), 0)}</p> */}
                        ok
                    </div>
                    {/* <div className=''>
                        {record.variationIds.map((item, index) => (
                            <p className='my-4 h-8' key={index}>
                                {item.sold}
                            </p>
                        ))}
                    </div> */}
                </>
            ),
            responsive: ['md'],
        },
        {
            title: 'Giá tiền (VNĐ)',
            key: 'price',
            render: (_, record) => {
                return (
                    <>
                        <div className='flex flex-col justify-between'>
                            {/* <p className='h-14 whitespace-nowrap'>
                                {record.variationIds &&
                                    record.variationIds.length > 1 &&
                                    `${Currency.format(record.variationIds[0].price)} - ${Currency.format(record.variationIds[record.variationIds.length - 1].price)}`}
                                {record.variationIds &&
                                    record.variationIds.length === 1 &&
                                    `${Currency.format(record.variationIds[0].price)}`}
                            </p> */}
                            ok
                        </div>
                        <div className=''>
                            {/* {record.variationIds.map((item, index) => (
                                <p className='my-4 h-8' key={index}>
                                    {Currency.format(item.price)}
                                </p>
                            ))} */}
                        </div>
                    </>
                );
            },
        },
        {
            title: 'Kho hàng',
            key: 'stock',
            render: (_, record) => (
                <>
                    <div className='flex flex-col justify-between'>
                        {/* <p className='h-14 whitespace-nowrap'>
                            {record.variationIds.reduce((acc, curr) => acc + (curr.stock || 0), 0) !== 0 ? (
                                record.variationIds.reduce((acc, curr) => acc + (curr.stock || 0), 0)
                            ) : (
                                <span className='text-red'>Hết hàng</span>
                            )}
                        </p> */}
                        ok
                    </div>
                    <div className=''>
                        {/* {record.variationIds.map((item, index) => (
                            <p className='my-4 h-8' key={index}>
                                {item.stock ? item.stock : <span className='text-red'>Hết hàng</span>}
                            </p>
                        ))} */}
                    </div>
                </>
            ),
        },
        {
            title: 'Danh mục',
            key: 'categoryId',
            filters: [],
            filteredValue: getFilteredValue('categoryId'),
            render: (_, record) => {
                return <h4>{record.categoryId.name}</h4>;
            },
        },
        {
            title: 'Thương hiệu',
            key: 'brandId',
            filteredValue: getFilteredValue('brandId'),
            filters: [],
            render: (_, record) => {
                return <h4>{record.brandId.name}</h4>;
            },
        },
        {
            title: 'Trạng thái',
            key: 'isHide',
            filteredValue: getFilteredValue('isHide'),
            filters: [
                { text: 'Ẩn', value: 'true' },
                { text: 'Hiện', value: 'false' },
            ],
            render: (_, record) => {
                return (
                    <>
                        <p className='text-red'>{record.isHide && 'Đã ẩn'}</p>
                        <p className='text-green-400'>{!record.isHide && 'Đang hiển thị'}</p>
                    </>
                );
            },
        },

        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space key={record._id} className='flex flex-col items-start justify-start'>
                    <Tooltip title='Cập nhật'>
                        <Link
                            to={`/admin/products/${record._id}/edit`}
                            className='text-blue-500 transition-colors duration-500 hover:text-blue-400'
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
                    <Button icon={<PlusOutlined />} type='primary'>
                        Thêm mới sản phẩm
                    </Button>
                </Link>
            }
        >
            <TableDisplay<any>
                onFilter={onFilter}
                columns={columns}
                currentPage={currentPage}
                dataSource={[]}
                onSelectPaginateChange={onSelectPaginateChange}
                totalDocs={2}
            />
        </WrapperPageAdmin>
    );
};

export default ProductList;

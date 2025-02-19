/* eslint-disable @typescript-eslint/no-shadow */
import { PlusOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { ADMIN_ROUTES } from '~/constants/router';
import useTable from '~/hooks/_common/useTable';
import TableDisplay from '~/components/_common/TableDisplay';
import { TableProps } from 'antd/lib';
import { useGetAllProductForAdmin } from '~/hooks/queries/products/useGetAllProductForAdmin';
import { IProduct } from '~/types/Product';
import { IVariant } from '~/types/Variant';
import WrapperPageAdmin from '~/pages/Admin/_common/WrapperPageAdmin';

const ProductList = () => {
    const { onSelectPaginateChange, query, onFilter, getColumnSearchProps } = useTable<IProduct>();
    const currentPage = Number(query.page || 1);
    const { data } = useGetAllProductForAdmin(query);

    const columns: TableProps<IProduct>['columns'] = [
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
                        {record.variants.map((item, index) => (
                            <div className='my-4 flex items-center gap-2' key={index}>
                                <div>
                                    <img
                                        src={item.color.image}
                                        className='h-8 w-8 object-cover'
                                        alt={record.name + item.color.name}
                                    />
                                </div>
                                <div>
                                    <p>{item.color.name}</p>
                                </div>
                                <div>
                                    <p className='text-[10px]'>{item.items.map((att) => att.size.value).join(', ')}</p>
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
            render: (sold) => (
                <>
                    <div className='flex flex-col justify-between'>
                        <p className='h-14'>{sold}</p>
                    </div>
                </>
            ),
            responsive: ['md'],
        },
        {
            title: 'Giá tiền (VNĐ)',
            key: 'price',
            dataIndex: 'price',
            render: (price) => {
                return (
                    <>
                        <div className='flex flex-col justify-between'>
                            <p className='h-14 whitespace-nowrap'>{price}</p>
                        </div>
                    </>
                );
            },
        },
        {
            title: 'Kho hàng',
            key: 'stock',
            dataIndex: 'variants',
            render: (variants) => (
                <>
                    <div className='flex flex-col justify-between'>
                        <p className='h-14 whitespace-nowrap'>
                            {variants.reduce((acc: number, curr: IVariant) => {
                                return acc + curr.items.reduce((accSub, currSub) => accSub + currSub.stock, 0);
                            }, 0) || <span className='text-red'>Hết hàng</span>}
                        </p>
                    </div>
                    <div className=''>
                        {variants.map((el: IVariant) => {
                            const stockColor = el.items.reduce((accSub, currSub) => accSub + currSub.stock, 0);
                            return (
                                <p className='my-4 h-8' key={el.color._id}>
                                    {stockColor !== 0 ? stockColor : <span className='text-red'>Hết hàng</span>}
                                </p>
                            );
                        }, 0) || <span className='text-red'>Hết hàng</span>}
                    </div>
                </>
            ),
        },
        {
            title: 'Danh mục',
            key: 'categoryId',
            filters: [],
            // filteredValue: getFilteredValue('categoryId'),
            render: (_, record) => {
                return (
                    <h4>
                        {record.categories
                            .filter((item) => item !== null)
                            .map((item) => item.name)
                            .join('/')}
                    </h4>
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
                            to={`${ADMIN_ROUTES.PRODUCTS_EDIT}/${record._id}`}
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
            <TableDisplay<IProduct>
                onFilter={onFilter}
                columns={columns}
                currentPage={currentPage}
                dataSource={data?.data || []}
                onSelectPaginateChange={onSelectPaginateChange}
                totalDocs={2}
            />
        </WrapperPageAdmin>
    );
};

export default ProductList;

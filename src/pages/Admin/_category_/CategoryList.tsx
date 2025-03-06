import { ADMIN_ROUTES } from '~/constants/router';
import useTable from '~/hooks/_common/useTable';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Space, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import TableDisplay from '~/components/_common/TableDisplay';
import WrapperPageAdmin from '../_common';
import { useGetAllCate } from '~/hooks/queries/catrgories/useGetAllCate';
import { ICategory } from '~/types/Category';

const CategoryList = () => {
    const { query, onFilter, onSelectPaginateChange, getColumnSearchProps } = useTable<ICategory>();
    const { data } = useGetAllCate(query);

    const categoryList = data || [];
    const totalDocs = data?.totalDocs || 0;
    const currentPage = data?.page || 1;

    const columns: TableProps<ICategory>['columns'] = [
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'search',
            render: (text) => <h4>{text}</h4>,
            ...getColumnSearchProps('name'),
            width: '20%',
        },
        {
            title: 'Danh mục phụ',
            dataIndex: 'items',
            key: 'items',
            render: (_, record) => {
                console.log(record);
                return (
                    <>
                        {/* {record.items.map((item) => {
                            if (item.name) {
                                return (
                                    <h4 key={item._id} className='inline-block rounded bg-slate-50 px-3 py-1'>
                                        {item.name}
                                    </h4>
                                );
                            } else {
                                return <span>Danh mục này không có danh mục phụ!</span>;
                            }
                        })} */}

                        {record.items.length != 0 &&
                            record.items.map((item) => {
                                return (
                                    <h4 key={item._id} className='inline-block rounded bg-slate-50 px-3 py-1'>
                                        {item.name}
                                    </h4>
                                );
                            })}

                        {record.items.length == 0 && (
                            <h4 className='inline-block rounded bg-slate-50 px-3 py-1'>
                                Danh mục này không có danh mục phụ!
                            </h4>
                        )}
                    </>
                );
            },
            width: '20%',
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size={'middle'}>
                    <Tooltip title='Cập nhật danh mục'>
                        <Link to={`${ADMIN_ROUTES.COLOR_EDIT}/${record._id}`} className='text-blue-500'>
                            <EditOutlined className='rounded-full bg-blue-100 p-2' style={{ fontSize: '1rem' }} />
                        </Link>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <WrapperPageAdmin
            title='Quản lý danh mục'
            option={
                <Link to={ADMIN_ROUTES.COLOR_CREATE}>
                    <Button icon={<PlusOutlined />} type='primary'>
                        Thêm mới danh mục
                    </Button>
                </Link>
            }
        >
            <TableDisplay<ICategory>
                onFilter={onFilter}
                columns={columns}
                currentPage={currentPage}
                dataSource={categoryList}
                onSelectPaginateChange={onSelectPaginateChange}
                totalDocs={totalDocs}
            />
        </WrapperPageAdmin>
    );
};

export default CategoryList;

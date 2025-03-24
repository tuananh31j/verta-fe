import type { TableProps } from 'antd';
import { Image } from 'antd';
import TableDisplay from '~/components/_common/TableDisplay';
import useTable from '~/hooks/_common/useTable';
import useGetAllUsers from '~/hooks/queries/user/useGetAllUsers';
import { IUsers } from '~/types/User';
import WrapperPageAdmin from '../_common';

const UserList = () => {
    const { query, onFilter, onSelectPaginateChange, getColumnSearchProps } = useTable<IUsers>();
    const { data } = useGetAllUsers();

    const userList = data?.users || [];

    const totalDocs = data ? data?.users.length : 1;
    const currentPage = Number(query.page || 1);

    const columns: TableProps<IUsers>['columns'] = [
        {
            title: <div className='text-center'>Avatar</div>,
            dataIndex: 'avatar',
            key: 'avatar',
            render: (_, record) => (
                <div className='flex w-full items-center justify-center text-center'>
                    <Image width={100} height={100} src={record.avatar} />
                </div>
            ),
            width: '5%',
        },
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'search',
            render: (name) => <h4>{name}</h4>,
            ...getColumnSearchProps('name'),
            width: '20%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'hex',
            render: (email) => <h4>{email}</h4>,
            width: '20%',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            render: (phone) => <h4>{phone}</h4>,
            width: '20%',
        },
        // {
        //     title: 'Thao tác',
        //     key: 'action',
        //     render: (_, record) => (
        //         <Space size={'middle'}>
        //             <Tooltip title='Cập nhật màu sắc'>
        //                 <Link to={`${ADMIN_ROUTES.COLOR_EDIT}/${record._id}`} className='text-blue-500'>
        //                     <EditOutlined className='rounded-full bg-blue-100 p-2' style={{ fontSize: '1rem' }} />
        //                 </Link>
        //             </Tooltip>
        //         </Space>
        //     ),
        // },
    ];

    return (
        <WrapperPageAdmin title='Quản lý người dùng'>
            <TableDisplay<IUsers>
                onFilter={onFilter}
                columns={columns}
                currentPage={currentPage}
                dataSource={userList}
                onSelectPaginateChange={onSelectPaginateChange}
                totalDocs={totalDocs}
            />
        </WrapperPageAdmin>
    );
};

export default UserList;

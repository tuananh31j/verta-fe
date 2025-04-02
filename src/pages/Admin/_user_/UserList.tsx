import type { TableProps } from 'antd';
import { Button, Image, Popconfirm, Space, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import TableDisplay from '~/components/_common/TableDisplay';
import useTable from '~/hooks/_common/useTable';
import { useUnBanAccount } from '~/hooks/mutations/user/useUnBanUser';
import useGetAllUsers from '~/hooks/queries/user/useGetAllUsers';
import { IUsers } from '~/types/User';
import WrapperPageAdmin from '../_common';
import BanAccountModal from './BanAccountModal';

const UserList = () => {
    const { query, onFilter, onSelectPaginateChange, getColumnSearchProps } = useTable<IUsers>();
    const { data } = useGetAllUsers();
    const { mutate: unBanAccount, isPending } = useUnBanAccount();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userId, setUserId] = useState('');

    const userList = data?.users || [];

    const totalDocs = data ? data?.users?.length : 1;
    const currentPage = Number(query.page || 1);

    const showModal = (userIdParams: string) => {
        setIsModalOpen(true);
        setUserId(userIdParams);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

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
        {
            title: 'Trạng thái tài khoản',
            dataIndex: 'isBanned',
            key: 'isBanned',
            render: (_, record) => (
                <div>
                    {record.isBanned ? (
                        <>
                            <span className='text-red-500'>Đã bị khóa</span>
                            <div className='mt-1 font-semibold'>
                                Lý do: <span className='font-normal'> {record.bannedReason}</span>
                            </div>
                            <div className='mt-1 font-semibold'>
                                Ngày khóa:{' '}
                                <span className='font-normal'> {dayjs(record.bannedAt).format('DD/MM/YYYY')}</span>
                            </div>
                            <div className='mt-1 font-semibold'>
                                <Link to={`/admin/users/backlog/${record._id}`} className='text-green-500'>
                                    Chi tiết trạng thái trước đó
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <span className='text-green-500'>Đang hoạt động</span>
                            <div className='mt-1 font-semibold'>
                                <Link to={`/admin/users/backlog/${record._id}`} className='text-green-500'>
                                    Chi tiết trạng thái trước đó
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            ),
            width: '40%',
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size={'middle'}>
                    {record.isBanned ? (
                        <Popconfirm
                            title='Mở khóa tài khoản'
                            placement='topLeft'
                            description='Bạn có muốn mở khóa tài khoản này không?'
                            onConfirm={() => unBanAccount({ userId: record._id })}
                            okText='Đồng ý'
                            cancelText='Hủy'
                        >
                            <Tooltip title='Mở khóa tài khoản'>
                                {
                                    <Button disabled={isPending} loading={isPending} type='dashed'>
                                        Mở khóa
                                    </Button>
                                }
                            </Tooltip>
                        </Popconfirm>
                    ) : (
                        <Tooltip title='Khóa tài khoản'>
                            {
                                <Button
                                    type='dashed'
                                    disabled={isModalOpen}
                                    onClick={() => showModal(record._id)}
                                    danger
                                >
                                    Khóa
                                </Button>
                            }
                        </Tooltip>
                    )}
                </Space>
            ),
            width: '20   %',
        },
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
            <BanAccountModal
                handleCancel={handleCancel}
                handleOk={handleOk}
                isModalOpen={isModalOpen}
                userId={userId}
            />
        </WrapperPageAdmin>
    );
};

export default UserList;

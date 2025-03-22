import { PlusOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip, Badge, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { ADMIN_ROUTES } from '~/constants/router';
import useTable from '~/hooks/_common/useTable';
import TableDisplay from '~/components/_common/TableDisplay';
import { TableProps } from 'antd/lib';
import { Currency } from '~/utils';
import WrapperPageAdmin from '../_common';
import { IVoucher } from '~/types/Voucher';
import { formatDate } from '~/utils/formatDate';
import { useGetALlVoucherForAdmin } from '~/hooks/queries/vouchers/useGetAllVoucherForAdmin';
import { useUpdateStatusVoucher } from '~/hooks/mutations/vouchers/useUpdateStatusVoucher';

const VoucherList = () => {
    const { onSelectPaginateChange, query, onFilter, getColumnSearchProps, getSortedInfo } = useTable<IVoucher>();

    const currentPage = Number(query.page || 1);
    const { data: voucherList } = useGetALlVoucherForAdmin(query);
    const { mutate: publicVoucher } = useUpdateStatusVoucher();

    const totalDocs = voucherList?.totalDocs || 0;

    const columns: TableProps<IVoucher>['columns'] = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'search',
            ...getColumnSearchProps('name'),
            render: (_, record) => <div className='text-center'>{record.name}</div>,
        },
        {
            title: 'Mã',
            dataIndex: 'code',
            key: 'code',
            ...getColumnSearchProps('code'),
            render: (_, record) => <div className='text-center'>{record.code}</div>,
        },
        {
            title: 'Số lượng',
            key: 'maxUsage',
            dataIndex: 'maxUsage',
            width: '7%',
            sortOrder: getSortedInfo('maxUsage'),
            sorter: (a: any, b: any) => a.maxUsage - b.maxUsage,
            render: (maxUsage) => <div className='text-center'>{maxUsage.toLocaleString('de-DE')}</div>,
        },
        {
            title: 'Lượt dùng /user',
            key: 'usagePerUser',
            dataIndex: 'usagePerUser',
            width: '10%',
            sortOrder: getSortedInfo('usagePerUser'),
            sorter: (a: any, b: any) => a.usagePerUser - b.usagePerUser,
            render: (usagePerUser) => <div className='text-center'>{usagePerUser.toLocaleString('de-DE')}/user</div>,
        },
        {
            title: 'Loại giảm giá',
            key: 'discountType',
            dataIndex: 'discountType',
            width: '10%',
            render: (discountType) => (
                <div className='text-center'>{discountType === 'percentage' ? 'Phần trăm' : 'Cố định'}</div>
            ),
        },
        {
            title: 'Giá trị giảm',
            key: 'voucherDiscount',
            dataIndex: 'voucherDiscount',
            sortOrder: getSortedInfo('voucherDiscount'),
            sorter: (a: any, b: any) => a.voucherDiscount - b.voucherDiscount,
            width: '8%',
            render: (voucherDiscount, record) => (
                <div className='text-center'>
                    {record.discountType === 'percentage' ? `${voucherDiscount}%` : Currency.format(voucherDiscount)}
                </div>
            ),
        },
        {
            title: 'Giảm tối đa',
            key: 'maxDiscountAmount',
            dataIndex: 'maxDiscountAmount',
            width: '8%',
            render: (amount, record) => (
                <div className='text-center'>
                    {record.discountType === 'percentage' && amount > 0 ? Currency.format(amount) : '-'}
                </div>
            ),
        },
        {
            title: 'Đơn hàng tối thiểu',
            key: 'minimumOrderPrice',
            dataIndex: 'minimumOrderPrice',
            width: '10%',
            render: (minimumOrderPrice) => <div className='text-center'>{Currency.format(minimumOrderPrice)}</div>,
        },
        {
            title: 'Ngày bắt đầu',
            key: 'startDate',
            width: '10%',
            render: (value, record) => <div className='text-center'>{formatDate(record.startDate)}</div>,
        },
        {
            title: 'Ngày kết thúc',
            key: 'endDate',
            width: '10%',
            render: (value, record) => <div className='text-center'>{formatDate(record.endDate)}</div>,
        },
        {
            title: 'Chỉ user mới',
            key: 'isOnlyForNewUser',
            width: '8%',
            render: (value, record) => (
                <div className='text-center'>
                    {record.isOnlyForNewUser ? (
                        <Badge status='success' text='Có' />
                    ) : (
                        <Badge status='default' text='Không' />
                    )}
                </div>
            ),
        },
        {
            title: 'Trạng thái',
            key: 'status',
            width: '8%',
            render: (value, record) => (
                <div className='text-center'>
                    {record.status ? (
                        <Badge status='processing' text='Công khai' color='green' />
                    ) : (
                        <Badge status='default' text='Đã ẩn' />
                    )}
                </div>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: '15%',
            render: (value, record) => (
                <Space key={record._id} className='flex flex-col items-start justify-start'>
                    <Tooltip title='Cập nhật'>
                        <Link
                            to={`${ADMIN_ROUTES.VOUCHER_EDIT}/${record._id}`}
                            className='inline-flex items-center rounded-md px-3 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700'
                        >
                            Cập nhật
                        </Link>
                    </Tooltip>
                    {record.status ? (
                        <Tooltip className='hover:cursor-pointer hover:underline' title='Ẩn voucher đi'>
                            <Popconfirm
                                placement='leftBottom'
                                title='Bạn có chắc chắn muốn ẩn voucher này?'
                                description='Voucher sẽ bị ẩn khỏi người dùng'
                                onConfirm={() => publicVoucher(record._id)}
                                okText='Đồng ý'
                                cancelText='Đóng'
                            >
                                <p className='text-gray-500 transition-colors duration-500 hover:text-blue-400'>
                                    Ẩn đi
                                </p>
                            </Popconfirm>
                        </Tooltip>
                    ) : (
                        <Tooltip className='hover:cursor-pointer hover:underline' title='Công khai voucher'>
                            <Popconfirm
                                placement='leftBottom'
                                title='Bạn có chắc chắn muốn công khai voucher này?'
                                description='Voucher sẽ được công khai và có thể sử dụng được'
                                onConfirm={() => publicVoucher(record._id)}
                                okText='Đồng ý'
                                cancelText='Đóng'
                            >
                                <p className='text-green-500 transition-colors duration-500 hover:text-blue-400'>
                                    Công khai
                                </p>
                            </Popconfirm>
                        </Tooltip>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <WrapperPageAdmin
            title='Quản lý voucher'
            option={
                <Link to={ADMIN_ROUTES.VOUCHER_CREATE}>
                    <Button icon={<PlusOutlined />} type='primary' size='large' className='hover:opacity-90'>
                        Thêm mới voucher
                    </Button>
                </Link>
            }
        >
            <TableDisplay<IVoucher>
                onFilter={onFilter}
                columns={columns}
                currentPage={currentPage}
                dataSource={voucherList?.vouchers || []}
                onSelectPaginateChange={onSelectPaginateChange}
                totalDocs={totalDocs}
            />
        </WrapperPageAdmin>
    );
};

export default VoucherList;

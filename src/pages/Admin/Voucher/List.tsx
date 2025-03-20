import { PlusOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip, Tag, Badge, Popconfirm } from 'antd';
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
            title: 'Tên voucher',
            dataIndex: 'name',
            key: 'search',
            ...getColumnSearchProps('name'),
            render: (_, record) => <div className='text-center'>{record.name}</div>,
        },
        {
            title: 'Mã voucher',
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
            sorter: (a: any, b: any) => a.sold - b.sold,
            render: (maxUsage) => <div className='text-center'>{maxUsage.toLocaleString('de-DE')}</div>,
        },
        {
            title: 'Lượt dùng/user',
            key: 'usagePerUser',
            dataIndex: 'usagePerUser',
            width: '10%',
            sortOrder: getSortedInfo('usagePerUser'),
            sorter: (a: any, b: any) => a.sold - b.sold,
            render: (usagePerUser) => <div className='text-center'>{usagePerUser.toLocaleString('de-DE')}/user</div>,
        },
        {
            title: 'Giá trị giảm',
            key: 'voucherDiscount',
            dataIndex: 'voucherDiscount',
            sortOrder: getSortedInfo('voucherDiscount'),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            sorter: (a: any, b: any) => a.sold - b.sold,
            width: '15%',
            render: (price) => <div className='text-center'>{Currency.format(price)}</div>,
        },
        {
            title: 'Giá trị đơn hàng tối thiểu',
            key: 'minimumOrderPrice',
            dataIndex: 'minimumOrderPrice',
            width: '15%',
            render: (minimumOrderPrice) => <div className='text-center'>{Currency.format(minimumOrderPrice)}</div>,
        },
        {
            title: 'Ngày bắt đầu',
            key: 'startDate',
            width: '15%',
            render: (value, record) => <div className='text-center'>{formatDate(record.startDate)}</div>,
        },
        {
            title: 'Ngày kết thúc',
            key: 'endDate',
            width: '15%',
            render: (value, record) => <div className='text-center'>{formatDate(record.endDate)}</div>,
        },
        {
            title: 'Trạng thái',
            key: 'status',
            width: '10%',
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
            width: '10%',
            render: (value, record) => (
                <Space key={record._id} className='flex flex-col items-start justify-start'>
                    <Space className='flex flex-col items-start gap-2'>
                        <Tooltip title='Cập nhật'>
                            <Link
                                to={`${ADMIN_ROUTES.VOUCHER_EDIT}/${record._id}`}
                                className='inline-flex items-center rounded-md px-3 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700'
                            >
                                Cập nhật
                            </Link>
                        </Tooltip>
                    </Space>
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

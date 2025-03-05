import type { TableColumnsType } from 'antd';
import { Button, Tooltip } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { ORDER_STATUS } from '~/constants/order';
import useTable from '~/hooks/_common/useTable';
import { OrderStatus } from '~/constants/enum';
import TableDisplay from '../../../components/_common/TableDisplay';

interface Props {
    ordersList: {
        _id: string;
        totalPrice: number;
        paymentMethod: string;
        isPaid: boolean;
        createdAt: string;
    }[];
    totalDocs: number;
}

interface DataType {
    key: number;
    code: string;
    total: number;
    customerName: string;
    paymentMethod: string;
    paymentStatus: string;
    orderStatus: string;
    createdAt: string;
}

const OrderTable = ({ ordersList, totalDocs }: Props) => {
    const { getColumnSearchProps, query, onSelectPaginateChange, onFilter, getSortedInfo, getFilteredValue } =
        useTable<any>();
    const currentPage = Number(query.page || 1);
    console.log(ordersList);
    const dataSource =
        ordersList && ordersList.length
            ? ordersList.map((order: any, index) => {
                  return {
                      key: index,
                      code: order._id,
                      customerName: order?.customerInfo?.name,
                      total: order.totalPrice,
                      paymentMethod: order.paymentMethod,
                      paymentStatus: order.isPaid ? 'Paid' : 'Unpaid',
                      orderStatus: order.orderStatus,
                      createdAt: order.createdAt,
                  };
              })
            : [];

    const columns: TableColumnsType<DataType> = [
        {
            key: 'search',
            dataIndex: 'code',
            title: 'Mã đơn hàng',
            ...getColumnSearchProps('code'),
            render: (text: string) => {
                const shortCode = text.substring(0, 8) + '...';
                return (
                    <Tooltip title={text}>
                        <span>{shortCode}</span>
                    </Tooltip>
                );
            },
        },
        {
            key: 'rawsearch',
            dataIndex: 'customerName',
            title: 'Tên khách hàng',
            ...getColumnSearchProps('customerName'),
            ellipsis: true,
        },
        {
            key: 'totalPrice',
            dataIndex: 'total',
            title: 'Tổng tiền',
            render: (text: number) => {
                return <span>{text.toLocaleString()} đ</span>;
            },
            sortOrder: getSortedInfo('totalPrice'),
            sorter: (a: any, b: any) => a.total - b.total,
        },
        {
            key: 'isPaid',
            dataIndex: 'paymentStatus',
            title: 'Trạng thái thanh toán',
            filteredValue: getFilteredValue('isPaid'),
            render: (text: string) => {
                if (text === 'Unpaid') {
                    return <span className='text-red font-semibold'>Chưa thanh toán</span>;
                }

                return <span className='font-semibold text-green-500'>Đã thanh toán</span>;
            },
            filters: [
                { text: 'Đã thanh toán', value: true },
                { text: 'Chưa thanh toán', value: false },
            ],
        },
        {
            key: 'orderStatus',
            dataIndex: 'orderStatus',
            title: 'Trạng thái đơn hàng',
            filteredValue: getFilteredValue('orderStatus'),
            render: (text: string) => {
                if (text === ORDER_STATUS.CANCELLED) {
                    return <span className='text-red font-semibold'>Đã hủy</span>;
                } else if (text === ORDER_STATUS.CONFIRMED) {
                    return <span className='font-semibold text-blue-500'>Đã xác nhận</span>;
                } else if (text === ORDER_STATUS.SHIPPING) {
                    return <span className='font-semibold text-green-500'>Đang giao</span>;
                } else if (text === ORDER_STATUS.DELIVERED) {
                    return <span className='font-semibold text-green-500'>Đã giao</span>;
                } else if (text === ORDER_STATUS.DONE) {
                    return <span className='font-semibold text-green-500'>Hoàn thành</span>;
                }

                return <span className='font-semibold text-yellow-500'>Chờ xác nhận</span>;
            },
            filters: [
                { text: 'Chờ Xác nhận', value: OrderStatus.pending },
                { text: 'Đã xác nhận', value: OrderStatus.confirmed },
                { text: 'Đang giao', value: OrderStatus.shipping },
                { text: 'Đã giao', value: OrderStatus.delivered },
                { text: 'Hoàn thành', value: OrderStatus.done },
                { text: 'Đã hủy', value: OrderStatus.cancelled },
            ],
        },
        {
            key: 'createdAt',
            dataIndex: 'createdAt',
            title: 'Ngày đặt hàng',
            render: (text: string) => {
                return moment(text).format('DD/MM/YYYY hh:mm:ss');
            },
            sortOrder: getSortedInfo('createdAt'),
            sorter: (a: any, b: any) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf(),
        },
        {
            key: 'action',
            title: 'Thao tác',
            render: (text, record) => {
                return (
                    <Link to={`/admin/orders/${record.code}/detail`}>
                        <Button type='primary'>Xem chi tiết</Button>
                    </Link>
                );
            },
        },
    ];

    return (
        <TableDisplay<DataType>
            onFilter={onFilter}
            columns={columns}
            currentPage={currentPage}
            dataSource={dataSource}
            onSelectPaginateChange={onSelectPaginateChange}
            totalDocs={totalDocs}
        />
    );
};
export default OrderTable;

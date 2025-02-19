import { Button, ConfigProvider } from 'antd';
import { OrderStatus, PaymentMethod } from '~/constants/enum';
import OrderStatusTag from '~/components/OrderStatusTag';
import dayjs from 'dayjs';
import { Link, Params } from 'react-router-dom';
import { TableProps } from 'antd/lib';
import { ColumnType } from 'antd/es/table';
import { formatCurrency } from '~/utils/formatCurrrency';

export interface DataType {
    _id: string;
    paymentMethod: PaymentMethod;
    orderStatus: string;
    totalPrice: number;
    createdAt: string;
}

const filterStatusItems = [
    {
        text: 'Chờ xác nhận',
        value: OrderStatus.pending,
    },
    {
        text: 'Đã hủy',
        value: OrderStatus.cancelled,
    },
    {
        text: 'Đã xác nhận',
        value: OrderStatus.confirmed,
    },
    {
        text: 'Đang giao',
        value: OrderStatus.shipping,
    },
    {
        text: 'Đã giao',
        value: OrderStatus.delivered,
    },
    {
        text: 'Hoàn thành',
        value: OrderStatus.done,
    },
];

const translatePaymentMethod = (method: PaymentMethod) => {
    const translations: { [key in PaymentMethod]: string } = {
        [PaymentMethod.card]: 'Thanh toán online',
        [PaymentMethod.cash]: 'Thanh toán khi nhận hàng (COD)',
        // Add more translations as needed
    };
    return translations[method] || method; // Fallback to original if not found
};

export const orderColumns = ({
    query,
    getColumnSearchProps,
}: {
    query: Params;
    getColumnSearchProps: (dataIndex: string) => ColumnType<any>;
}): TableProps<DataType>['columns'] => {
    return [
        {
            title: 'ID',
            dataIndex: '_id',
            key: 'search',
            ...getColumnSearchProps('_id'),
        },
        {
            title: 'Hình thức thanh toán',
            dataIndex: 'paymentMethod',
            filteredValue: query.paymentMethod ? (query.paymentMethod as string).split(',') : undefined,
            render: (text: PaymentMethod) => <span className='font-semibold'>{translatePaymentMethod(text)}</span>,
            filters: [
                {
                    text: 'Online',
                    value: PaymentMethod.card,
                },
                {
                    text: 'COD',
                    value: PaymentMethod.cash,
                },
            ],
        },
        {
            title: 'Tổng giá trị',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            sortOrder: query.sort
                ? query.sort.includes('totalPrice')
                    ? query.sort.includes('-')
                        ? 'descend'
                        : 'ascend'
                    : undefined
                : undefined,
            showSorterTooltip: { target: 'full-header' },
            filteredValue: query.totalPrice ? (query.totalPrice as string).split(',') : undefined,
            render: (value) => <span>{formatCurrency(value)}</span>,
            sorter: (a: any, b: any) => a.totalPrice - b.totalPrice,
        },
        {
            title: 'Trạng thái',
            key: 'orderStatus',
            dataIndex: 'orderStatus',
            filteredValue: query.orderStatus ? (query.orderStatus as string).split(',') : undefined,
            render: (value) => <OrderStatusTag status={value} />,
            filters: filterStatusItems,
        },
        {
            title: 'Ngày đặt',
            key: 'createdAt',
            dataIndex: 'createdAt',
            sortOrder: query.sort
                ? query.sort.includes('createdAt')
                    ? query.sort.includes('-')
                        ? 'descend'
                        : 'ascend'
                    : undefined
                : undefined,
            sorter: (a: any, b: any) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
            render: (value) => <span>{dayjs(value).format('DD/MM/YYYY  hh-mm')}</span>,
        },
        {
            title: 'Thao tác',
            render: (value, record) => (
                <>
                    <Link to={`/account/my-orders/${record._id}`}>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Button: {
                                        defaultBg: '#da291c',
                                        defaultColor: '#ffffff',
                                        defaultHoverBorderColor: '#da291c',
                                        defaultHoverColor: '#da291c',
                                    },
                                },
                            }}
                        >
                            <Button className='mr-2'>Xem chi tiết</Button>
                        </ConfigProvider>
                    </Link>
                </>
            ),
        },
    ];
};

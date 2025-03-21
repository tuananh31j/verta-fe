import React from 'react';
import { Tooltip } from 'antd';
import { ClockCircleOutlined, ShoppingCartOutlined, TruckOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useGetPendingTask } from '~/hooks/queries/stats/useGetPendingTask';

interface OrderStatus {
    title: string;
    count: number;
    icon: React.ReactNode;
    bgColor: string;
    tooltip: string;
}

const OrderStatusCards: React.FC = () => {
    const { data, isLoading, error } = useGetPendingTask();

    if (isLoading) {
        return <div className='container mx-auto px-4 py-6 text-center'>Đang tải...</div>;
    }

    if (error || !data || !data.data) {
        return (
            <div className='container mx-auto px-4 py-6 text-center text-red-500'>
                Lỗi: {error?.message || 'Không có dữ liệu'}
            </div>
        );
    }

    console.log(data?.data?.data);

    const orderStatuses: OrderStatus[] = [
        {
            title: 'Chờ Xác Nhận',
            count: data?.data?.data?.pendingOrders,
            icon: <ClockCircleOutlined className='text-blue-600' />,
            bgColor: 'bg-gradient-to-br from-blue-50 to-white',
            tooltip: 'Đơn hàng đang chờ xác nhận từ cửa hàng',
        },
        {
            title: 'Chờ Lấy Hàng',
            count: data?.data?.data?.confirmedOrders,
            icon: <ShoppingCartOutlined className='text-yellow-600' />,
            bgColor: 'bg-gradient-to-br from-yellow-50 to-white',
            tooltip: 'Đơn hàng đã xác nhận, đang chờ lấy hàng',
        },
        {
            title: 'Đã Xuất Lý',
            count: data?.data?.data?.shippingOrders,
            icon: <TruckOutlined className='text-green-600' />,
            bgColor: 'bg-gradient-to-br from-green-50 to-white',
            tooltip: 'Đơn hàng đã được xuất lý và đang giao',
        },
        {
            title: 'Đơn Hủy',
            count: data?.data?.data?.cancelledOrders,
            icon: <CloseCircleOutlined className='text-red-600' />,
            bgColor: 'bg-gradient-to-br from-red-50 to-white',
            tooltip: 'Đơn hàng đã bị hủy',
        },
        {
            title: 'Sản Phẩm Hết Hàng',
            count: data?.data?.data?.outOfStockProducts,
            icon: <ShoppingCartOutlined className='text-gray-600' />,
            bgColor: 'bg-gradient-to-br from-gray-50 to-white',
            tooltip: 'Sản phẩm trong đơn hàng đã hết hàng',
        },
    ];

    return (
        <div className='container mx-auto px-4 py-6'>
            <h2 className='mb-6 text-2xl font-bold text-gray-800'>Danh sách các việc cần làm</h2>

            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                {orderStatuses.map((status: any, index: number) => (
                    <Tooltip key={index} title={status.tooltip}>
                        <div
                            className={`${status.bgColor} transform cursor-pointer rounded-xl border border-gray-100 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                        >
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='text-sm font-medium text-gray-600'>{status.title}</p>
                                    <h3 className='mt-1 text-2xl font-semibold text-gray-900'>{status.count}</h3>
                                </div>
                                <div className='rounded-full bg-white p-3 shadow-sm'>{status.icon}</div>
                            </div>
                        </div>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
};

export default OrderStatusCards;

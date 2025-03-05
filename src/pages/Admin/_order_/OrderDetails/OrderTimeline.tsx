import React from 'react';
import { Timeline, Card } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined, SyncOutlined, CarOutlined, StarOutlined } from '@ant-design/icons';

interface OrderTimelineProps {
    createdAt: string;
    orderStatus: string;
    expiredAt?: string;
}

const OrderTimeline: React.FC<OrderTimelineProps> = ({ createdAt, orderStatus, expiredAt }) => {
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusDetails = (status: string) => {
        switch (status) {
            case 'pending':
                return {
                    icon: <ClockCircleOutlined />,
                    color: 'blue',
                    label: 'Chờ xác nhận',
                };
            case 'confirmed':
                return {
                    icon: <CheckCircleOutlined />,
                    color: 'green',
                    label: 'Đã xác nhận',
                };
            case 'shipping':
                return {
                    icon: <CarOutlined />,
                    color: 'orange',
                    label: 'Đang giao hàng',
                };
            case 'delivered':
                return {
                    icon: <SyncOutlined />,
                    color: 'purple',
                    label: 'Đã giao hàng',
                };
            case 'done':
                return {
                    icon: <StarOutlined />,
                    color: 'gold',
                    label: 'Hoàn thành',
                };
            default:
                return {
                    icon: <ClockCircleOutlined />,
                    color: 'gray',
                    label: 'Trạng thái không xác định',
                };
        }
    };

    const timelineItems = [
        {
            color: 'green',
            children: (
                <div>
                    <p className='font-semibold'>Đơn hàng được tạo</p>
                    <p className='text-gray-600'>{formatDateTime(createdAt)}</p>
                </div>
            ),
        },
        {
            color: getStatusDetails(orderStatus).color,
            children: (
                <div>
                    <p className='font-semibold'>{getStatusDetails(orderStatus).label}</p>
                    <p className='text-gray-600'>
                        {orderStatus !== 'pending' ? formatDateTime(new Date().toISOString()) : 'Đang chờ'}
                    </p>
                </div>
            ),
            dot: getStatusDetails(orderStatus).icon,
        },
    ];

    if (expiredAt) {
        timelineItems.push({
            color: 'red',
            children: (
                <div>
                    <p className='font-semibold text-red-600'>Hết hạn</p>
                    <p className='text-gray-600'>{formatDateTime(expiredAt)}</p>
                </div>
            ),
        });
    }

    return (
        <Card title='Lịch sử đơn hàng' className='w-full rounded-2xl border-gray-100 shadow-sm'>
            <Timeline items={timelineItems} className='px-4' />
        </Card>
    );
};

export default OrderTimeline;

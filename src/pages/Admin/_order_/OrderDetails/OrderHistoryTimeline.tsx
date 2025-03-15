import React from 'react';
import { Timeline, Card, Tag, Skeleton, Typography, Empty, Tooltip, Badge } from 'antd';
import { useHistoryOrder } from '~/hooks/queries/orders/useGetHistoryOrder';
import {
    ClockCircleOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    CarOutlined,
    InboxOutlined,
    ShoppingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

dayjs.extend(relativeTime);
dayjs.locale('vi');

const { Title, Text } = Typography;

interface OrderHistoryTimelineProps {
    orderId: any;
}

const OrderHistoryTimeline: React.FC<OrderHistoryTimelineProps> = ({ orderId }) => {
    const { data, isLoading, error } = useHistoryOrder(orderId);
    const history = data || [];
    const statusConfig = {
        pending: {
            color: 'orange',
            icon: <ClockCircleOutlined />,
            label: 'Chờ xử lý',
        },
        confirmed: {
            color: 'blue',
            icon: <CheckCircleOutlined />,
            label: 'Đã xác nhận',
        },
        shipping: {
            color: 'cyan',
            icon: <CarOutlined />,
            label: 'Đang giao hàng',
        },
        delivered: {
            color: 'green',
            icon: <InboxOutlined />,
            label: 'Đã giao hàng',
        },
        done: {
            color: 'green',
            icon: <CheckCircleOutlined />,
            label: 'Hoàn thành',
        },
        cancelled: {
            color: 'red',
            icon: <CloseCircleOutlined />,
            label: 'Đã hủy',
        },
    };

    const getFormattedDate = (dateString: string) => {
        const date = dayjs(dateString);
        return {
            relative: date.fromNow(),
            full: date.format('DD/MM/YYYY HH:mm:ss'),
        };
    };

    if (isLoading) {
        return (
            <Card className='w-full shadow-md'>
                <Skeleton active paragraph={{ rows: 6 }} />
            </Card>
        );
    }
    if (error) {
        return (
            <Card className='w-full bg-red-50 shadow-md'>
                <div className='p-4 text-center text-red-500'>
                    <CloseCircleOutlined className='mb-2 text-2xl' />
                    <p>Đã xảy ra lỗi khi tải lịch sử đơn hàng</p>
                </div>
            </Card>
        );
    }
    if (!data) {
        return (
            <Card className='w-full shadow-md'>
                <Empty description='Không có lịch sử cập nhật đơn hàng' image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </Card>
        );
    }

    console.log(history);

    const sortedHistory = history.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    return (
        <Card
            title={
                <div className='flex items-center'>
                    <ShoppingOutlined className='mr-2 text-blue-500' />
                    <Title level={4} className='m-0'>
                        Lịch sử đơn hàng
                    </Title>
                </div>
            }
            className='w-full border border-gray-200 shadow-md transition-shadow hover:shadow-lg'
            headStyle={{ borderBottom: '2px solid #f0f0f0' }}
        >
            <Timeline
                mode='left'
                items={sortedHistory.map((item, index) => {
                    const status = item.status.toLowerCase();
                    const config =
                        status in statusConfig
                            ? statusConfig[status as keyof typeof statusConfig]
                            : { color: 'gray', icon: null, label: status };

                    const dateInfo = getFormattedDate(item.updatedAt);

                    return {
                        color: config.color,
                        dot: config.icon,
                        children: (
                            <div className='mb-6 last:mb-0'>
                                <div className='mb-1 flex flex-col justify-between sm:flex-row sm:items-start'>
                                    <div>
                                        <Tag color={config.color} className='mr-2 text-xs font-semibold'>
                                            {config.label}
                                        </Tag>
                                        <Tooltip title={dateInfo.full}>
                                            <Text type='secondary' className='text-xs'>
                                                {dateInfo.relative}
                                            </Text>
                                        </Tooltip>
                                    </div>
                                    <div className='mt-1 sm:mt-0'>
                                        <Tooltip title={item.updatedBy?.email}>
                                            <Badge
                                                count={item.updatedByRole === 'admin' ? 'Admin' : 'User'}
                                                style={{
                                                    backgroundColor:
                                                        item.updatedByRole === 'admin' ? '#108ee9' : '#52c41a',
                                                }}
                                            >
                                                <Tag icon={<UserOutlined />} className='mr-0'>
                                                    {item.updatedByName || `${item.updatedBy?.name || 'Người dùng'}`}
                                                </Tag>
                                            </Badge>
                                        </Tooltip>
                                    </div>
                                </div>

                                <div
                                    className='mt-2 rounded-md border-l-4 bg-gray-50 p-3'
                                    style={{ borderLeftColor: config.color }}
                                >
                                    <Text>
                                        {item.description || `Trạng thái đơn hàng được cập nhật thành ${config.label}`}
                                    </Text>
                                </div>
                            </div>
                        ),
                    };
                })}
            />
        </Card>
    );
};

export default OrderHistoryTimeline;

import React from 'react';
import { Card, Flex, Typography, Avatar, Tooltip, Button } from 'antd';
import { CreditCardOutlined, DollarOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { Currency } from '~/utils';
import OrderStatusTag from '~/components/OrderStatusTag';
import { OrderStatus } from '~/constants/enum';

const { Text } = Typography;

type LatestOrder = {
    _id: string;
    totalPrice: number;
    paymentMethod: 'cash' | 'card';
    orderStatus: OrderStatus;
    createdAt: string;
    customerName: string;
    customerAvatar: string;
};

const LatestOrders: React.FC<{ orders: LatestOrder[] }> = ({ orders }) => {
    const navigate = useNavigate();

    const handleViewDetails = (orderId: string) => {
        navigate(`/admin/orders/${orderId}/detail`);
    };

    return (
        <Flex className='my-4' gap={16}>
            {orders.slice(0, 2).map((order) => (
                <Card key={order._id} className='w-1/2 shadow-md transition-shadow duration-300 hover:shadow-lg'>
                    <Flex align='center' justify='space-between'>
                        <Flex align='center' className='w-2/5'>
                            <Avatar
                                src={order.customerAvatar}
                                icon={!order.customerAvatar && <UserOutlined />}
                                size={48}
                                className='mr-3'
                            />

                            <Flex vertical>
                                <Text strong className='text-lg'>
                                    {order.customerName}
                                </Text>

                                <Text type='secondary'>{dayjs(order.createdAt).format('DD/MM/YYYY HH:mm')}</Text>
                            </Flex>
                        </Flex>

                        <Flex align='center' className='w-3/5' justify='space-between'>
                            <Tooltip title={order.paymentMethod === 'cash' ? 'Thanh toán tiền mặt' : 'Thanh toán thẻ'}>
                                {order.paymentMethod === 'cash' ? (
                                    <DollarOutlined style={{ fontSize: 24, color: '#3c50e0' }} />
                                ) : (
                                    <CreditCardOutlined style={{ fontSize: 24, color: '#3c50e0' }} />
                                )}
                            </Tooltip>

                            <Text strong className='text-lg'>
                                {Currency.format(order.totalPrice)}
                            </Text>

                            <OrderStatusTag status={order.orderStatus} />

                            <Tooltip title='Xem chi tiết'>
                                <Button
                                    type='primary'
                                    icon={<EyeOutlined />}
                                    shape='circle'
                                    onClick={() => handleViewDetails(order._id)}
                                />
                            </Tooltip>
                        </Flex>
                    </Flex>
                </Card>
            ))}
        </Flex>
    );
};

export default LatestOrders;

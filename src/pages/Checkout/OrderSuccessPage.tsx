import { CheckCircleOutlined } from '@ant-design/icons';
import { Avatar, Card, List, Spin, Typography, Watermark } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useGetDetailOrder } from '~/hooks/queries/order/useGetDetailOrder';
import { reset } from '~/store/slice/checkoutSlice';
import { formatCurrency } from '~/utils/formatCurrrency';

const { Title, Text } = Typography;

const OrderSuccessPage: React.FC = () => {
    const { id } = useParams();
    const { data: orderData, isPending } = useGetDetailOrder(id as string);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);
    return (
        <Watermark content={'VERTA SPORT'}>
            <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6'>
                {orderData && !isPending ? (
                    <Card className='w-full max-w-2xl rounded-xl p-6 text-center shadow-lg'>
                        <div className='text-green-500'>
                            <CheckCircleOutlined className='mb-4 text-5xl text-green-500' />
                        </div>
                        <div className='text-center text-3xl text-green-600'>Đặt hàng thành công!</div>
                        <p className='text-gray-600'>Mã đơn hàng: {orderData._id}</p>
                        <div className='mt-4 text-left'>
                            <Title level={4}>Thông tin khách hàng</Title>
                            <Text>Tên: {orderData.customerInfo.name}</Text>
                            <br />
                            <Text>Email: {orderData.customerInfo.email}</Text>
                            <br />
                            <Text>Điện thoại: {orderData.customerInfo.phone}</Text>
                            <Title level={4} className='mt-4'>
                                Địa chỉ giao hàng
                            </Title>
                            <Text>
                                {orderData.shippingAddress.address}, {orderData.shippingAddress.district},{' '}
                                {orderData.shippingAddress.province}
                            </Text>
                            <Title level={4} className='mt-4'>
                                Sản phẩm đã đặt
                            </Title>
                            <List
                                itemLayout='horizontal'
                                dataSource={orderData.items}
                                renderItem={(item) => (
                                    <Link to={`/product/${item.productId}`} className='group'>
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<Avatar src={item.image} shape='square' size={64} />}
                                                title={
                                                    <span className='duration-300 group-hover:text-cyan-600'>
                                                        {item.name}
                                                    </span>
                                                }
                                                description={`Size: ${item.size} | Số lượng: ${item.quantity} | Giá: ${formatCurrency(item.price)}`}
                                            />
                                        </List.Item>
                                    </Link>
                                )}
                            />
                            <Title level={5} className='mt-4'>
                                Phí giao hàng: {formatCurrency(orderData.shippingFee)}
                            </Title>
                            <Title level={4} className='mt-4'>
                                Tổng tiền: {formatCurrency(orderData.totalPrice)}
                            </Title>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Link to='/' className='w-2/3'>
                                <button className='mt-4 w-full cursor-pointer rounded-md border border-black px-4 py-2 text-black duration-300 hover:bg-black hover:text-white'>
                                    Về trang chủ
                                </button>
                            </Link>
                            <Link to={'/'} className='w-2/3'>
                                <button className='mt-4 w-full cursor-pointer rounded-md border border-black px-4 py-2 text-black duration-300 hover:bg-black hover:text-white'>
                                    Xem đơn hàng
                                </button>
                            </Link>
                        </div>
                    </Card>
                ) : (
                    <Spin />
                )}
            </div>
        </Watermark>
    );
};

export default OrderSuccessPage;

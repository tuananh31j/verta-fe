import { CreditCardFilled, LeftOutlined, PayCircleOutlined, PercentageOutlined } from '@ant-design/icons';
import { Card, Input, Space } from 'antd';
import { Link, useParams } from 'react-router-dom';
import WrapperList from '~/components/_common/WrapperList';
import { MAIN_ROUTES } from '~/constants/router';
// import ActionLink from '~/pages/Client/Account/MyOrders/Components/ActionLink';
import { useState } from 'react';
import { OrderStatus } from '~/constants/enum';
import { useOrderDetails } from '~/hooks/queries/orders/useOrderDetails';
import { IOrderItem } from '~/interfaces/order';
import OrderStatusBar from '~/pages/Admin/_order_/OrderDetails/OrderStatusBar';
import { formatCurrency } from '~/utils/formatCurrrency';
import { formatDate } from '~/utils/formatDate';
import ActionLink from '../Components/ActionLink';
import ReviewModal from './_Components/ReviewModal';
import TableDetailOrder from './_Components/TableDetailOrder';

const OrderDetailPage = () => {
    const { id } = useParams();
    const { data, isLoading } = useOrderDetails(id!);
    const [productId, setProductId] = useState('');

    const orderStatus = data?.orderStatus as OrderStatus;

    const receiverInfo = data?.customerInfo;
    const shippingAddress = data && data?.shippingAddress;

    const serviceInfo = {
        paymentMethod: data?.paymentMethod || '',
        shippingFee: data?.shippingFee || 0,
        totalPrice: data?.totalPrice || 0,
        isPaid: data?.isPaid || false,
        voucherName: data?.voucherName || '',
        voucherCode: data?.voucherCode || '',
        voucherDiscount: data?.voucherDiscount || 0,
    };

    const orderItems = data?.items || [];
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = (productIdParams: string) => {
        setIsModalOpen(true);
        setProductId(productIdParams);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const getTotalQuantity = (items: IOrderItem[]): number => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };
    const getPaymentMethodLabel = (method: string) => {
        switch (method) {
            case 'cash':
                return 'Thanh toán khi nhận hàng';
            case 'card':
                return 'Thanh toán Online';
            default:
                return 'Phương thức thanh toán khác';
        }
    };
    return (
        <>
            <div className='mx-auto mt-5 w-full max-w-[1200px] xl:mx-auto xl:max-w-7xl'>
                {/* BREADCRUMB */}
                {!isLoading && (
                    <WrapperList
                        title={`Chi tiết đơn hàng #${data?.orderCode}`}
                        option={
                            <Link to={`/${MAIN_ROUTES.MY_ORDERS}`}>
                                <LeftOutlined /> Quay Trở Về Danh Sach
                            </Link>
                        }
                    >
                        <Space className='flex w-full items-center justify-between rounded-lg bg-[#fff] p-4 font-semibold'>
                            <span>Ngày Đặt Đơn Hàng: {formatDate(data?.createdAt as string)} </span>

                            <div className='mt-2 ml-4'>
                                <ActionLink orderId={id as string} status={orderStatus} />
                            </div>
                        </Space>

                        {orderStatus !== 'cancelled' ? (
                            <>
                                <OrderStatusBar orderStatus={orderStatus} />
                            </>
                        ) : (
                            <Space className='mt-5 flex w-full flex-col items-center justify-center rounded-lg bg-[#fff] p-4 font-semibold'>
                                <Space align='center' direction='vertical'>
                                    <h2 className='text-rose-500'>
                                        Đơn hàng đã bị hủy bởi{' '}
                                        {data?.canceledBy === 'admin' ? (
                                            <span>Quản trị viên</span>
                                        ) : (
                                            <span>Khách hàng</span>
                                        )}
                                    </h2>

                                    <p className='font-normal'>
                                        {data?.canceledBy === 'system' ? 'Thanh toán thất bại' : data?.description}
                                    </p>
                                </Space>
                            </Space>
                        )}
                        <Space direction='vertical' className='w-full' size='large'>
                            {/* USER INFOR */}
                            <Card
                                className='w-full overflow-hidden rounded-2xl border-gray-100 shadow-sm'
                                title={
                                    <div className='flex items-center justify-between py-2'>
                                        <h3 className='text-xl font-semibold text-gray-700'>Thông tin cá nhân</h3>
                                    </div>
                                }
                            >
                                <div className='mt-2'>
                                    <div className='grid grid-cols-3'>
                                        <div>
                                            <p className='font-semibold'>Tên người nhận:</p>
                                            <p className='mt-2'>{receiverInfo?.name}</p>
                                        </div>
                                        <div>
                                            <p className='font-semibold'>Số điện thoại:</p>
                                            <p className='mt-2'>{receiverInfo?.phone}</p>
                                        </div>
                                        <div>
                                            <p className='font-semibold'>Email:</p>
                                            <p className='mt-2'>{receiverInfo?.email}</p>
                                        </div>
                                    </div>
                                    <div className='mt-4'>
                                        <p className='font-semibold'>Địa chỉ nhận hàng:</p>
                                        <p className='mt-2'>
                                            [{shippingAddress?.address}] - {shippingAddress?.ward} -{' '}
                                            {shippingAddress?.district} -{shippingAddress?.province} -{' '}
                                            {shippingAddress?.country}
                                        </p>
                                    </div>
                                    <div className='mt-4'>
                                        <p className='mb-2 font-semibold'>Ghi chú:</p>
                                        <Input.TextArea
                                            className='rounded-xl border-gray-200 bg-gray-50'
                                            rows={1}
                                            readOnly
                                            value={data?.description || 'Không có ghi chú nào cho đơn hàng này'}
                                            style={{
                                                resize: 'none',
                                                fontSize: '0.95rem',
                                                color: data?.description ? '#374151' : '#6B7280',
                                            }}
                                        />
                                    </div>
                                </div>
                            </Card>

                            {/* SERVICE INFOR */}
                            <Card
                                className='w-full overflow-hidden rounded-2xl border-gray-100 shadow-sm'
                                title={
                                    <div className='flex items-center justify-between py-2'>
                                        <h2 className='text-xl font-semibold text-gray-700'>Thông tin dịch vụ</h2>
                                    </div>
                                }
                            >
                                <div className='mt-2'>
                                    <div className='grid grid-cols-3 gap-3'>
                                        {/* PAYMENT METHOD */}
                                        <div
                                            className={`rounded-xl border border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4`}
                                        >
                                            <div className='flex items-center gap-3'>
                                                <div className='flex items-center justify-center rounded-lg bg-white p-2 shadow-sm'>
                                                    <CreditCardFilled className='text-xl text-blue-500' />
                                                </div>
                                                <div className='flex-1'>
                                                    <p className='mb-1 text-base text-gray-600'>
                                                        Phương thức thanh toán
                                                    </p>
                                                    <p className='text-sm font-semibold text-gray-800'>
                                                        {getPaymentMethodLabel(serviceInfo.paymentMethod)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* SHIPPING FEE */}
                                        <div
                                            className={`rounded-xl border border-gray-100 bg-gradient-to-r from-yellow-50 to-amber-50 p-4`}
                                        >
                                            <div className='flex items-center gap-3'>
                                                <div className='flex items-center justify-center rounded-lg bg-white p-2 shadow-sm'>
                                                    <PercentageOutlined className='text-2xl text-yellow-500' />
                                                </div>
                                                <div className='flex-1'>
                                                    <p className='mb-1 text-base text-gray-600'>Phí vận chuyển</p>
                                                    <p className='text-sm font-semibold text-gray-800'>
                                                        {formatCurrency(serviceInfo.shippingFee)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* DISCOUNT */}
                                        <div
                                            className={`rounded-xl border border-gray-100 bg-gradient-to-r from-green-50 to-green-50 p-4`}
                                        >
                                            <div className='flex items-center gap-3'>
                                                <div className='flex items-center justify-center rounded-lg bg-white p-2 shadow-sm'>
                                                    <img
                                                        src='https://cdn-icons-png.flaticon.com/512/4649/4649082.png'
                                                        className={`w-7`}
                                                        alt=''
                                                    />
                                                </div>
                                                <div className='flex-1'>
                                                    <p className='mb-1 text-base text-gray-600'>
                                                        Mã giảm giá {serviceInfo.voucherCode}
                                                    </p>
                                                    <p className='text-sm font-semibold text-gray-800'>
                                                        {formatCurrency(serviceInfo.voucherDiscount)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* ISPAID */}
                                        <div
                                            className={`rounded-xl border border-gray-100 bg-gradient-to-r from-fuchsia-50 to-fuchsia-50 p-4`}
                                        >
                                            <div className='flex items-center gap-3'>
                                                <div className='flex items-center justify-center rounded-lg bg-white p-2 shadow-sm'>
                                                    <PayCircleOutlined className='text-2xl text-yellow-500' />
                                                </div>
                                                <div className='flex-1'>
                                                    <p className='mb-1 text-base text-gray-600'>
                                                        Trạng thái thanh toán
                                                    </p>
                                                    <div className='flex items-center gap-2'>
                                                        {serviceInfo.isPaid ? (
                                                            <>
                                                                <span className='font-semibold text-green-700'>
                                                                    Đã thanh toán
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span className='font-semibold text-gray-800'>
                                                                    Chưa thanh toán
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* TOTAL PRODUCT */}
                                        <div
                                            className={`rounded-xl border border-gray-100 bg-gradient-to-r from-gray-100 to-gray-100 p-4`}
                                        >
                                            <div className='flex items-center gap-3'>
                                                <div className='flex items-center justify-center rounded-lg bg-white p-2 shadow-sm'>
                                                    <img
                                                        src='https://upload.wikimedia.org/wikipedia/commons/1/14/Product_sample_icon_picture.png'
                                                        className={`w-7`}
                                                        alt=''
                                                    />
                                                </div>
                                                <div className='flex-1'>
                                                    <p className='mb-1 text-base text-gray-600'>Tổng sản phẩm</p>
                                                    <p className='text-sm font-semibold text-gray-800'>
                                                        {getTotalQuantity(orderItems)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* TOTAL PRICE */}
                                        <div
                                            className={`rounded-xl border border-gray-100 bg-gradient-to-r from-red-50 to-red-50 p-4`}
                                        >
                                            <div className='flex items-center gap-3'>
                                                <div className='flex items-center justify-center rounded-lg bg-white p-2 shadow-sm'>
                                                    <img
                                                        src='https://cdn-icons-png.flaticon.com/512/4470/4470504.png'
                                                        className={`w-7`}
                                                        alt=''
                                                    />
                                                </div>
                                                <div className='flex-1'>
                                                    <p className='mb-1 text-base text-gray-600'>Tổng tiền</p>
                                                    <p className='text-sm font-semibold text-gray-800'>
                                                        {formatCurrency(serviceInfo.totalPrice)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Space>
                        {/* <ReceiverInfor
                            receiverInfo={receiverInfo as IOrder['customerInfo']}
                            shippingAddress={shippingAddress as IOrder['shippingAddress']}
                            description={data?.description as string}
                        /> */}

                        {/* <ServicesDetail services={serviceInfo} totalQuantity={getTotalQuantity(orderItems)} /> */}

                        <TableDetailOrder
                            orderItems={orderItems}
                            status={orderStatus}
                            orderId={id as string}
                            showModal={showModal}
                        />
                    </WrapperList>
                )}

                <ReviewModal
                    isModalOpen={isModalOpen}
                    orderId={id || ''}
                    productId={productId}
                    handleCancel={handleCancel}
                    handleOk={handleOk}
                />
            </div>
        </>
    );
};

export default OrderDetailPage;

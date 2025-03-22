import { Space } from 'antd';
import { useParams } from 'react-router-dom';
import { useOrderDetails } from '~/hooks/queries/orders/useOrderDetails';
import CustomerInfo from './CustomerInfo';
import OrderStatusBar from './OrderStatusBar';
import ServiceInfo from './ServiceInfo';
import TableOrderItems from './TableOrderItems';
import OrderDetailNavbar from './OrderDetailNavbar';
import OrderHistoryTimeline from './OrderHistoryTimeline';
import { OrderItem } from '~/interfaces/order';

const OrderDetail = () => {
    const { id } = useParams();
    const { data: orderData } = useOrderDetails(id!);

    if (!orderData) {
        return <div>Đang tải...</div>;
    }

    const {
        orderCode,
        orderStatus,
        customerInfo,
        shippingAddress,
        paymentMethod,
        shippingFee,
        totalPrice,
        isPaid,
        items = [],
        canceledBy,
        description,
    } = orderData;

    const serviceInfo = {
        paymentMethod,
        shippingFee,
        totalPrice,
        isPaid,
        tax: 0,
        voucherName: orderData?.voucherName || '',
        voucherCode: orderData?.voucherCode || '',
        voucherDiscount: orderData?.voucherDiscount || 0,
    };

    return (
        <>
            <OrderDetailNavbar orderStatus={orderStatus} id={id!} orderCode={`${orderCode}`} />

            {orderStatus !== 'cancelled' ? (
                <OrderStatusBar orderStatus={orderStatus} />
            ) : (
                <Space className='mt-5 flex w-full flex-col items-center justify-center rounded-lg bg-[#fff] p-4 font-semibold'>
                    <Space align='center' direction='vertical'>
                        <h2 className='text-rose-500'>
                            Đơn hàng bị hủy bởi {canceledBy === 'admin' ? 'Quản trị viên' : 'Khách hàng'}
                        </h2>
                        {description && <p className='font-normal'>{description}</p>}
                    </Space>
                </Space>
            )}

            <ServiceInfo serviceInfo={serviceInfo} description={description || ''} />

            <CustomerInfo customerInfo={customerInfo} shippingAddress={shippingAddress} />
            <div className='mt-6'>
                <OrderHistoryTimeline orderId={id} />
            </div>

            <TableOrderItems serviceInfo={serviceInfo} orderItems={items as OrderItem[]} />
        </>
    );
};

export default OrderDetail;

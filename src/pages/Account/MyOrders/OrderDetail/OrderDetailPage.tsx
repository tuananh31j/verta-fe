import { LeftOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { Link, useParams } from 'react-router-dom';
import WrapperList from '~/components/_common/WrapperList';
import { MAIN_ROUTES } from '~/constants/router';
// import ActionLink from '~/pages/Client/Account/MyOrders/Components/ActionLink';
import { useState } from 'react';
import { OrderStatus } from '~/constants/enum';
import { useOrderDetails } from '~/hooks/queries/orders/useOrderDetails';
import { IOrder, IOrderItem } from '~/interfaces/order';
import ReceiverInfor from '~/pages/Account/MyOrders/OrderDetail/_Components/ReceiverInfor';
import { formatDate } from '~/utils/formatDate';
import ActionLink from '../Components/ActionLink';
import ServicesDetail from './_Components/ServicesDetail';
import TableDetailOrder from './_Components/TableDetailOrder';
import ReviewModal from './_Components/ReviewModal';

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

    return (
        <>
            <div className='mx-auto mt-5 w-full max-w-[1200px] xl:mx-auto xl:max-w-7xl'>
                {/* BREADCRUMB */}
                {!isLoading && (
                    <WrapperList
                        title={`Chi tiết đơn hàng #${id}`}
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
                        <ReceiverInfor
                            receiverInfo={receiverInfo as IOrder['customerInfo']}
                            shippingAddress={shippingAddress as IOrder['shippingAddress']}
                            description={data?.description as string}
                        />
                        <ServicesDetail services={serviceInfo} totalQuantity={getTotalQuantity(orderItems)} />
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

import { LeftOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { Link, useParams } from 'react-router-dom';
import WrapperList from '~/components/_common/WrapperList';
import { MAIN_ROUTES } from '~/constants/router';
// import ActionLink from '~/pages/Client/Account/MyOrders/Components/ActionLink';
import ReceiverInfor from '~/pages/Account/MyOrders/OrderDetail/_Components/ReceiverInfor';
import { IOrder, IOrderItem } from '~/interfaces/order';
import { formatDate } from '~/utils/formatDate';
import ServicesDetail from './_Components/ServicesDetail';
import TableDetailOrder from './_Components/TableDetailOrder';
import { useOrderDetails } from '~/hooks/queries/orders/useOrderDetails';

const OrderDetailPage = () => {
    const { id } = useParams();
    const { data, isLoading } = useOrderDetails(id!);

    const orderStatus = data?.orderStatus || '';

    const receiverInfo = data?.customerInfo;
    const shippingAddress = data && data?.shippingAddress;

    const serviceInfo = {
        paymentMethod: data?.paymentMethod || '',
        shippingFee: data?.shippingFee || 0,
        totalPrice: data?.totalPrice || 0,
        isPaid: data?.isPaid || false,
    };

    const orderItems = data?.items || [];

    console.log(orderItems);
    const getTotalQuantity = (items: IOrderItem[]): number => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <>
            <div className='mx-auto mt-5 w-full max-w-[1200px] xl:mx-auto xl:max-w-7xl'>
                {/* BREADCRUMB */}
                <div className='my-3 flex items-center gap-2 text-base'>
                    {/* <Link className='text-[#338dbc] duration-300 hover:text-cyan-500' to={'/cart/detail'}>
                        Giỏ hàng
                    </Link>
                    &gt; */}
                    <Link className='text-[#338dbc] duration-300 hover:text-cyan-500' to={'/account/my-orders'}>
                        Đơn hàng của tôi
                    </Link>
                    &gt;
                    <span className='text-black'>Chi tiết thanh toán</span>
                </div>
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
                            {/* <div className='mt-2 ml-4'>
                            action Link
                        </div> */}
                        </Space>
                        <ReceiverInfor
                            receiverInfo={receiverInfo as IOrder['customerInfo']}
                            shippingAddress={shippingAddress as IOrder['shippingAddress']}
                            description={data?.description as string}
                        />
                        <ServicesDetail services={serviceInfo} totalQuantity={getTotalQuantity(orderItems)} />
                        <TableDetailOrder orderItems={orderItems} status={orderStatus} />
                    </WrapperList>
                )}
            </div>
        </>
    );
};

export default OrderDetailPage;

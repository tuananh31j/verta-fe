import { Space } from 'antd';
import CancelOrderModal from './CancelOrderModal';
import PopConFirmOrder from './PopConfirmOrder';
import { ORDER_STATUS } from '~/constants/order';
import PopConfirmShipping from './PopConfirmShipping';
import PopConfirmDeliveredOrder from './PopConfirmDeliveredOrder';
interface Props {
    orderStatus: string;
    id: string;
}

const OrderDetailNavbar = ({ orderStatus, id }: Props) => {
    return (
        <Space className='flex w-full items-center justify-between rounded-lg bg-[#fff] p-4 font-semibold'>
            <span>Thông tin đơn hàng #{id}</span>
            {orderStatus === ORDER_STATUS.PENDING && (
                <Space>
                    <PopConFirmOrder orderId={id} />
                    <CancelOrderModal status={orderStatus} orderId={id!} />
                </Space>
            )}
            {orderStatus === ORDER_STATUS.CONFIRMED && (
                <Space>
                    <PopConfirmShipping orderId={id} />
                    <CancelOrderModal status={orderStatus} orderId={id!} />
                </Space>
            )}
            {orderStatus === ORDER_STATUS.SHIPPING && (
                <Space>
                    <PopConfirmDeliveredOrder orderId={id} />
                    <CancelOrderModal status={orderStatus} orderId={id!} />
                </Space>
            )}
            {/* {orderStatus === ORDER_STATUS.DELIVERED && (
                <>
                    <PopConfirmFinishOrder orderId={id} />
                </>
            )} */}
        </Space>
    );
};

export default OrderDetailNavbar;

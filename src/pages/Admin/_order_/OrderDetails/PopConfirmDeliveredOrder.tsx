import { Button, Popconfirm } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeliveredOrder } from '~/hooks/mutations/order/useDeliveredOrder';
import { useToast } from '~/context/ToastProvider';

interface Props {
    orderId: string;
}

const PopConfirmDeliveredOrder = ({ orderId }: Props) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    const deliveredOrder = useDeliveredOrder();

    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleConfirm = () => {
        if (!deliveredOrder.isPending) {
            setOpen(false);

            deliveredOrder.mutate(orderId, {
                onSuccess: () => {
                    toast('success', 'Đơn hàng đã được giao thành công');
                    navigate(`/admin/orders/${orderId}/detail`);
                    setOpen(false);
                },
                onError: (error) => {
                    toast('error', error.message);
                },
            });
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Popconfirm
            title='Xác nhận đã giao hàng'
            description='Bạn muốn xác nhận đã giao hàng thành công?'
            open={open}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        >
            <Button type='default' loading={deliveredOrder.isPending} onClick={showPopconfirm}>
                Xác nhận đã giao hàng thành công
            </Button>
        </Popconfirm>
    );
};

export default PopConfirmDeliveredOrder;

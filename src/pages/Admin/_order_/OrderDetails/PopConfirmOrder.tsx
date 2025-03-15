import { Button, Popconfirm } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfirmOrder } from '~/hooks/mutations/order/useConfirmOrder';
import { useToast } from '~/context/ToastProvider';
interface Props {
    orderId: string;
}

const PopConFirmOrder = ({ orderId }: Props) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    const confirmOrder = useConfirmOrder();

    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleConfirm = () => {
        if (!confirmOrder.isPending) {
            setOpen(false);

            confirmOrder.mutate(orderId, {
                onSuccess: () => {
                    toast('success', 'Đã xác nhận cho đơn hang này');
                    navigate(`/admin/orders/${orderId}/detail`);
                    // setOpen(false);
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
            title='Xác nhận đơn hàng và chuẩn bị hàng'
            description='Bạn muốn xác nhận cho đơn hang này?'
            open={open}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        >
            <Button loading={confirmOrder.isPending} type='default' onClick={showPopconfirm}>
                Xác nhận
            </Button>
        </Popconfirm>
    );
};

export default PopConFirmOrder;

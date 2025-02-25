import { useMutation } from '@tanstack/react-query';
import { useToast } from '~/context/ToastProvider';
import { IOrderPayOsPayLoad } from '~/interfaces/order';
import { orderService } from '~/services/order.service';
import { errorResponse } from '~/types/ErrorResponse';
const useCreatePayosOrder = () => {
    const toast = useToast();
    return useMutation({
        mutationKey: ['create-payos-order'],
        mutationFn: (orderData: IOrderPayOsPayLoad) => orderService.createOrderCard(orderData),
        onSuccess(data) {
            const { checkoutUrl } = data;

            if (checkoutUrl) {
                window.location.replace(checkoutUrl);
            }
        },
        onError(error: errorResponse) {
            console.log(error);
            toast('error', error.message);
        },
    });
};

export default useCreatePayosOrder;

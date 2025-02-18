import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { useToast } from '~/context/ToastProvider';
import { IOrderCreatePayload } from '~/interfaces/order';
import { orderService } from '~/services/order.service';

export const useCreateCodOrder = () => {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['CREATE_ORDER_COD'],
        mutationFn: (body: IOrderCreatePayload) => orderService.createOrderCash(body),
        onSuccess: () => {
            toast('success', 'Bạn đã đặt thành công đơn hàng');
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.CART],
            });
        },
    });
};

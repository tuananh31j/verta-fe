import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import instance from '~/utils/api/axiosInstance';

export const useConfirmOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (orderId: string) =>
            instance({
                method: 'PATCH',
                url: '/orders/confirm',
                data: { orderId },
            }),
        onSuccess() {
            queryClient.resetQueries({
                predicate: (query) => query.queryKey.includes(QUERY_KEY.MY_ORDERS),
            });
        },
    });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import instance from '~/utils/api/axiosInstance';

const useCancelOrder = (orderId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (reason: string) =>
            instance({
                url: '/orders/cancel',
                method: 'PATCH',
                data: { orderId, description: reason },
            }),
        onSuccess: () => {
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.some((element) =>
                        [QUERY_KEY.MY_ORDERS, QUERY_KEY.PRODUCTS].includes(element as string)
                    ),
            });
        },
    });
};

export default useCancelOrder;

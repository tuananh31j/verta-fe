import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { orderService } from '~/services/order.service';

export default function useFinishOrderClient() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['FINISH_ORDER'],
        mutationFn: (id: string) => orderService.finishOrder(id),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MY_ORDERS] });
            queryClient.resetQueries({
                predicate: (query) => query.queryKey.includes(QUERY_KEY.MY_ORDERS),
            });
        },
    });
}

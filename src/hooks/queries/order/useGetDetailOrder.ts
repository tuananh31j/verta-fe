import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { orderService } from '~/services/order.service';

export const useGetDetailOrder = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.ORDERS.ROOT, id],
        queryFn: () => orderService.getDetailOrder(id),
    });
};

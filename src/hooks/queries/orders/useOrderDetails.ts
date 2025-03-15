import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { orderService } from '~/services/order.service';

export const useOrderDetails = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.MY_ORDERS, id],
        queryFn: () => orderService.getDetailOrder(id),
    });
};

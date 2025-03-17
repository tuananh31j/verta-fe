import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { Params } from '~/interfaces/api';
import { orderService } from '~/services/order.service';

export const useGetMyOrders = (params: Params) => {
    return useQuery({
        queryKey: [QUERY_KEY.MY_ORDERS, ...Object.values(params)],
        queryFn: () => orderService.getAllOrder(params),
    });
};

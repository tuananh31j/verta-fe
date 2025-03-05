import { useMutation, useQueryClient } from '@tanstack/react-query';
import request from '~/utils/api/axiosInstance';
import { HTTP_METHOD } from '~/constants/http';
import { ORDER_ENDPOINT } from '~/constants/endPoint';
import { QUERY_KEY } from '~/constants/queryKey';

export const useShippingOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (orderId: string) => {
            const response = await request({
                method: HTTP_METHOD.PATCH,
                url: ORDER_ENDPOINT.SHIPPING_ORDER,
                data: { orderId },
            });
            console.log(response?.data?.data);

            return response?.data?.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.MY_ORDERS],
            });
        },
    });
};

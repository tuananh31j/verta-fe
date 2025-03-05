import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import request from '~/utils/api/axiosInstance';
import { HTTP_METHOD } from '~/constants/http';
import { ORDER_ENDPOINT } from '~/constants/endPoint';

export const useFinishOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (orderId: string) => {
            const response = await request({
                method: HTTP_METHOD.PATCH,
                url: ORDER_ENDPOINT.FINISH_ORDER,
                data: {
                    orderId,
                },
            });

            return response?.data?.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.MY_ORDERS] });
        },
    });
};

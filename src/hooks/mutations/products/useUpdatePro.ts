/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { useToast } from '~/context/ToastProvider';
import { productServices } from '~/services/product.service';

export const useUpdatePro = () => {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['PRODUCT'],
        mutationFn: ({ data, id }: { data: any; id: string }) => productServices.updateProduct(data, id),
        onSuccess: () => {
            toast('success', 'Cập nhật sản phẩm thành công!');
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.includes(QUERY_KEY.PRODUCTS.ROOT) ||
                    query.queryKey.includes(QUERY_KEY.CART) ||
                    query.queryKey.includes(QUERY_KEY.ORDERS.ROOT),
            });
        },
    });
};

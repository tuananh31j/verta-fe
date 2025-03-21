import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { useToast } from '~/context/ToastProvider';
import { productServices } from '~/services/product.service';

export const useDeletePro = () => {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => productServices.deleteProduct(id),
        onSuccess: () => {
            toast('success', 'Xóa thành công!');
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.includes(QUERY_KEY.PRODUCTS.ROOT) ||
                    query.queryKey.includes(QUERY_KEY.CART) ||
                    query.queryKey.includes(QUERY_KEY.ORDERS.ROOT),
            });
        },
    });
};

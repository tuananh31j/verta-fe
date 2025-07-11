import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { useToast } from '~/context/ToastProvider';
import { productServices } from '~/services/product.service';
import { ICreateProductPayload } from '~/types/Product';

export const useCreatePro = () => {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['PRODUCT'],
        mutationFn: (data: ICreateProductPayload) => productServices.createProduct(data),
        onSuccess: (data) => {
            toast('success', 'Tạo sản phẩm thành công!');
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.includes(QUERY_KEY.PRODUCTS.ROOT) ||
                    query.queryKey.includes(QUERY_KEY.CART) ||
                    query.queryKey.includes(QUERY_KEY.ORDERS.ROOT),
            });
        },
    });
};

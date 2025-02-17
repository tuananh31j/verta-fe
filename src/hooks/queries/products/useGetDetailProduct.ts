import { useQuery } from '@tanstack/react-query';
import { productServices } from '~/services/product.service';

export const useGetDetailProduct = (id: string) => {
    return useQuery({
        queryKey: ['PRODUCT', id],
        queryFn: () => productServices.getProductDetail(id),
    });
};

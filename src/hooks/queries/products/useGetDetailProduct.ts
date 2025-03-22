import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { productServices } from '~/services/product.service';

export const useGetDetailProduct = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS.ROOT, id],
        queryFn: () => productServices.getProductDetail(id),
        enabled: !!id,
    });
};

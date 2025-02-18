import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { productServices } from '~/services/product.service';

export const useGetProductsNewest = () => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS.ROOT, QUERY_KEY.PRODUCTS.NEWEST],
        queryFn: () => productServices.getProductsNewest(),
    });
};

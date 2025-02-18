import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { productServices } from '~/services/product.service';

export const useGetProductDetailsForAdmin = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS.ROOT, id],
        queryFn: () => productServices.getProductDetailForAdmin(id),
        enabled: !!id,
    });
};

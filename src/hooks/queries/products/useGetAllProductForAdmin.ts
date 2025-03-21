import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { productServices } from '~/services/product.service';
import { Params } from '~/types/Api';

export const useGetAllProductForAdmin = (params: Params) => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS.ROOT, ...Object.values(params || {}), ...Object.keys(params || {})],
        queryFn: () => productServices.getAllProductForAdmin(params),
    });
};

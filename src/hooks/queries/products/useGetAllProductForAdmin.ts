import { useQuery } from '@tanstack/react-query';
import { productServices } from '~/services/product.service';
import { Params } from '~/types/Api';

export const useGetAllProductForAdmin = (params: Params) => {
    return useQuery({
        queryKey: ['PRODUCT', ...Object.values(params || {}), ...Object.keys(params || {})],
        queryFn: () => productServices.getAllProductForAdmin(params),
    });
};

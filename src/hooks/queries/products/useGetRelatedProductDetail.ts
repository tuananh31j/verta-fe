import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { productServices } from '~/services/product.service';

export const useGetRelatedProductDetail = (id: string, cateId: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCTS.ROOT, QUERY_KEY.PRODUCTS.RELATED, cateId, id],
        queryFn: async () => {
            const data = await productServices.getProductsRelated(cateId);
            const filterData = data.data.filter((item) => item._id !== id);
            return filterData;
        },
    });
};

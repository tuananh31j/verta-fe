import { useQuery } from '@tanstack/react-query';
import { productServices } from '~/services/product.service';

export const useGetRelatedProductDetail = (id: string, cateId: string) => {
    return useQuery({
        queryKey: ['PRODUCT_RELATED', cateId],
        queryFn: async () => {
            const data = await productServices.getProductsRelated(cateId);
            const filterData = data.data.filter((item) => item._id !== id);
            return filterData;
        },
    });
};

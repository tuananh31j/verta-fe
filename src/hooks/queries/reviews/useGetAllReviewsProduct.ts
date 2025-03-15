import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { reviewService } from '~/services/review.service';
import { Params } from '~/types/Api';

const useGetAllReviewsProduct = (productId: string, params: Params) => {
    return useQuery({
        queryKey: [QUERY_KEY.GET_ALL_REVIEWS_PRODUCT, productId, ...Object.values(params)],
        queryFn: () => reviewService.getAllReviewProduct(productId, params),
        enabled: !!productId,
    });
};

export default useGetAllReviewsProduct;

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { reviewService } from '~/services/review.service';
import { Params } from '~/types/Api';

const useGetAllReviews = (params: Params) => {
    return useQuery({
        queryKey: [QUERY_KEY.GET_ALL_REVIEWS_PRODUCT_ADMIN, ...Object.values(params)],
        queryFn: () => reviewService.getAllReviews(params),
    });
};

export default useGetAllReviews;

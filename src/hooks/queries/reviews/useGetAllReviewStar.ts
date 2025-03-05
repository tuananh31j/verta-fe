import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { reviewService } from '~/services/review.service';

const useGetAllReviewStar = (productId: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.GET_ALL_REVIEWS_STARS, productId],
        queryFn: () => reviewService.getAllRatingStars(productId),
        enabled: !!productId,
    });
};

export default useGetAllReviewStar;

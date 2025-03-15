import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { useToast } from '~/context/ToastProvider';
import { ICreateReviewPayload } from '~/interfaces/review';
import { reviewService } from '~/services/review.service';

const useCreateReview = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    return useMutation({
        mutationKey: ['createReview'],
        mutationFn: (body: ICreateReviewPayload) => reviewService.createReview(body),
        onSuccess() {
            toast('success', 'Đánh giá thành công');
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.MY_ORDERS],
            });
        },
        onError(error) {
            console.log(error);
            toast('error', error.message);
        },
    });
};

export default useCreateReview;

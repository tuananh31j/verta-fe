import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { useToast } from '~/context/ToastProvider';
import { reviewService } from '~/services/review.service';

const useHiddenReview = () => {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => reviewService.hiddenReview(id),
        onSuccess() {
            toast('success', 'Ẩn thành công');
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_ALL_REVIEWS_PRODUCT_ADMIN] });
        },
    });
};

export default useHiddenReview;

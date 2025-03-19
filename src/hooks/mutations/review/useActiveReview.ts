import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { useToast } from '~/context/ToastProvider';
import { reviewService } from '~/services/review.service';

const useActiveReview = () => {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => reviewService.activeReview(id),
        onSuccess() {
            toast('success', 'Hiển thị thành công');
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_ALL_REVIEWS_PRODUCT_ADMIN] });
        },
    });
};

export default useActiveReview;

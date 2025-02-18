import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { cartService } from '~/services/cart.service';

const useRemoveCartItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['delete-cart'],
        mutationFn: (id: string) => cartService.removeCartItem(id),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CART] });
        },
        onError(error) {
            console.log(error);
        },
    });
};

export default useRemoveCartItem;

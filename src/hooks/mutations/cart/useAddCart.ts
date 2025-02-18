import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { QUERY_KEY } from '~/constants/queryKey';
import { cartService } from '~/services/cart.service';
import { openCart } from '~/store/slice/cartSlice';

const useAddCart = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['add-cart'],
        mutationFn: (cartData: { productId: string; variantId: string; quantity: number }) =>
            cartService.addToCart(cartData),
        onSuccess(data) {
            dispatch(openCart());
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CART] });
        },
        onError(error) {
            console.log(error);
        },
    });
};

export default useAddCart;

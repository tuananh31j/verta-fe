/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { QUERY_KEY } from '~/constants/queryKey';
import { useToast } from '~/context/ToastProvider';
import { cartService } from '~/services/cart.service';
import { openCart } from '~/store/slice/cartSlice';

const useAddCart = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const toast = useToast();
    return useMutation({
        mutationKey: ['add-cart'],
        mutationFn: (cartData: { productId: string; variantId: string; quantity: number }) =>
            cartService.addToCart(cartData),
        onSuccess(data) {
            dispatch(openCart());
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CART] });
        },
        onError(error: any) {
            if (error.message) {
                toast('info', error.message);
            }
        },
    });
};

export default useAddCart;

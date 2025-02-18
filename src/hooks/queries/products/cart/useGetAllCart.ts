import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { QUERY_KEY } from '~/constants/queryKey';
import { cartService } from '~/services/cart.service';
import { setQuantityInCart } from '~/store/slice/cartSlice';

const useGetAllCart = () => {
    const dispatch = useDispatch();
    return useQuery({
        queryKey: [QUERY_KEY.CART],
        queryFn: async () => {
            const res = await cartService.getAllCart();
            dispatch(setQuantityInCart(res.items.length));
            return res;
        },
    });
};

export default useGetAllCart;

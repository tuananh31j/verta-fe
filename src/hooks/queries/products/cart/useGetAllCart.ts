import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { cartService } from '~/services/cart.service';

const useGetAllCart = () => {
    return useQuery({
        queryKey: [QUERY_KEY.CART],
        queryFn: () => cartService.getAllCart(),
    });
};

export default useGetAllCart;

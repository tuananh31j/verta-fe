import { CART_ENDPOINT } from '~/constants/endPoint';
import instance from '~/utils/api/axiosInstance';

export const cartService = {
    async getAllCart() {
        const res = await instance.get<ICartResponse>(CART_ENDPOINT.GET_ALL);
        return res.data;
    },
    async addToCart(cartData: { productId: string; variantId: string; quantity: number }) {
        const res = await instance.post<null>(CART_ENDPOINT.ADD_CART, cartData);
        return res.data;
    },
    async updateCartQuantity(cartData: { productId: string; variantId: string; quantity: number }) {
        const res = await instance.patch<null>(CART_ENDPOINT.UPDATE_CART, cartData);
        return res.data;
    },
    async removeCartItem(id: string) {
        const res = await instance.delete<null>(`${CART_ENDPOINT.REMOVE_ITEM}/${id}`);
        return res.data;
    },
};

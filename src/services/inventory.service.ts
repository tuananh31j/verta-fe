import { INVENTORY_ENDPOINT } from '~/constants/endPoint';
import instance from '~/utils/api/axiosInstance';

export const inventoryService = {
    async updateStockOnCancelOrder(orderData: { orderId: string }) {
        const res = await instance.post<null>(INVENTORY_ENDPOINT.UPDATE_STOCK_ON_CANCEL_ORDER, orderData);
        return res.data;
    },
};

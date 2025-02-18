import { ORDER_ENDPONT } from '~/constants/endPoint';
import { IOrder, IOrderCreatePayload } from '~/interfaces/order';
import instance from '~/utils/api/axiosInstance';

export const orderService = {
    async createOrderCash(body: IOrderCreatePayload) {
        const { data } = await instance.post<IOrder>(`${ORDER_ENDPONT.CREATEORDERCOD}`, body);
        return data;
    },
    async getDetailOrder(id: string) {
        const { data } = await instance.get<IOrder>(`${ORDER_ENDPONT.MYORDER}/${id}`);
        return data;
    },
};

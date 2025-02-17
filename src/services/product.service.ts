import { IServerResponse } from '~/interfaces/api';
import { IProductDetail } from '~/interfaces/product';
import instance from '~/utils/api/axiosInstance';

export const productServices = {
    async getProductDetail(id: string) {
        const { data } = await instance.get<IProductDetail>(`/products/${id}`);
        return data;
    },
    async getProductsRelated(cateId: string) {
        const { data } = await instance.get<IServerResponse<IProductDetail[]>>(`/products/related/${cateId}`);
        return data;
    },
};

import { IServerResponse } from '~/interfaces/api';
import { IProductDetail } from '~/interfaces/product';
import instance from '~/utils/api/axiosInstance';

export const productServices = {
    async getProductsBestSelling() {
        const data: IServerResponse<{ data: IProductDetail[] }> = await instance.get('/products/best-selling');
        return data;
    },
    async getProductsNewest() {
        const data: IServerResponse<{ data: IProductDetail[] }> = await instance.get('/products/newest');
        return data;
    },
    async getProductDetail(id: string) {
        const { data } = await instance.get<IProductDetail>(`/products/${id}`);
        return data;
    },
    async getProductsRelated(cateId: string) {
        const { data } = await instance.get<IServerResponse<IProductDetail[]>>(`/products/related/${cateId}`);
        return data;
    },
};

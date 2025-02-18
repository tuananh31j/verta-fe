import { Params } from '~/types/Api';
import instance from '~/utils/api/axiosInstance';
import { ICreateProductPayload, IProductResponse } from '~/types/product';
import { ICreateVariant, IVariantResponse } from '~/types/variant';
import { AxiosResponse } from 'axios';

export const productServices = {
    async getProductDetail(id: string) {
        const { data } = await instance.get<IProductDetail>(`/products/${id}`);
        return data;
    },
    async getAllProductForAdmin(params: Params) {
        const { data } = await instance.get<IProductResponse>(`/products/admin`, { params });
        return data;
    },
    async createMultipleVariant(body: ICreateVariant[]) {
        const payload = { variants: body };
        const { data } = await instance.post<{ variants: ICreateVariant[] }, AxiosResponse<IVariantResponse[]>>(
            '/products/variant',
            payload
        );
        return data;
    },
    async createProduct(body: ICreateProductPayload) {
        await instance.post<ICreateProductPayload>('/products', body);
    },
};

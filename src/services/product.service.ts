/* eslint-disable @typescript-eslint/no-explicit-any */
import { Params } from '~/types/Api';
import { IServerResponse, PaginateResponse } from '~/interfaces/api';
import { IProduct, IProductDetail } from '~/interfaces/product';
import instance from '~/utils/api/axiosInstance';
import { ICreateProductPayload, IProductDetailsForAdmin, IProductResponse } from '~/types/Product';
import { ICreateVariant, IVariantResponse } from '~/types/Variant';
import { AxiosResponse } from 'axios';

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
    async deleteProduct(id: string) {
        const { data } = await instance.delete(`/products/${id}`);
        return data;
    },
    async getProductDetailForAdmin(id: string) {
        const { data } = await instance.get<IProductDetailsForAdmin>(`/products/admin/product-details/${id}`);
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
    async getProductsRelated(cateId: string) {
        const { data } = await instance.get<IServerResponse<IProductDetail[]>>(`/products/related/${cateId}`);
        return data;
    },
    async updateProduct(body: any, id: string) {
        await instance.patch<IServerResponse<any>>(`/products/update/${id}`, body);
    },
    async getAllProducts(params: Params) {
        const res = await instance.get<PaginateResponse<IProduct[]>>('/products/', { params });
        return res.data;
    },
};

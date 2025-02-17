import instance from '~/utils/api/axiosInstance';

export const productServices = {
    async getProductDetail(id: string) {
        const { data } = await instance.get<IProductDetail>(`/products/${id}`);
        return data;
    },
};

import { CATEGORY_ENDPONT } from '~/constants/endPoint';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { ICate, ICategory, ICategoryFormData, ICategoryResponse, ICateUpdateFormData } from '~/types/Category';
import instance from '~/utils/api/axiosInstance';

export const categoryService = {
    async getAllCate() {
        const { data } = await instance.get<ICate[]>('/cate');
        return data;
    },

    async getCateById(id: string) {
        const { data } = await instance.get<ICateUpdateFormData>('/cate/' + id);
        return data;
    },

    async updateCateById(id: string, payload: ICateUpdateFormData) {
        const { data } = await instance.patch<null>('/cate/' + id, payload);
        return data;
    },

    async createCategory(payload: ICategoryFormData) {
        const res = await instance.post<IAxiosResponse<ICategory>>(`${CATEGORY_ENDPONT.CREATE}`, payload);
        return res.data;
    },
};

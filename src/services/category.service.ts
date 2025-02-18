import { ICate } from '~/types/Category';
import instance from '~/utils/api/axiosInstance';

export const categoryServices = {
    async getAllCate() {
        const { data } = await instance.get<ICate[]>(`/cate`);
        return data;
    },
};

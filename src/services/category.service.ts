import { CATEGORY_ENDPONT } from '~/constants/endPoint';
import { Params } from '~/types/Api';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { ICategoryResponse } from '~/types/Category';
import instance from '~/utils/api/axiosInstance';

export const categoryServices = {
    async getAllCate(params: Params) {
        const { data } = await instance.get<IAxiosResponse<ICategoryResponse>>(`${CATEGORY_ENDPONT.ALL}`, { params });
        return data;
    },
};

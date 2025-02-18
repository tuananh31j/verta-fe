import { SIZE_ENDPOINT } from '~/constants/endPoint';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { ISize, ISizeFormData } from '~/types/Size';
import instance from '~/utils/api/axiosInstance';
import { Params } from 'react-router-dom';
import { SizeEnum } from '~/types/enum';

const sizeService = {
    async getAll(params: Params) {
        const res = await instance.get<
            IAxiosResponse<
                {
                    _id: string;
                    type: SizeEnum;
                    value: string;
                }[]
            >
        >(`${SIZE_ENDPOINT.ALL}`, { params });
        return res.data;
    },
    async getAllSizes() {
        const res = await instance.get<
            IAxiosResponse<
                {
                    _id: string;
                    type: SizeEnum;
                    value: string;
                }[]
            >
        >(`${SIZE_ENDPOINT.ALL}`);
        return res.data;
    },
    async createSize(payload: ISizeFormData) {
        const res = await instance.post<IAxiosResponse<ISize>>(`${SIZE_ENDPOINT.CREATE}`, payload);
        return res.data;
    },
    async updateSize(id: string, payload: ISizeFormData) {
        const res = await instance.patch<IAxiosResponse<ISize>>(`${SIZE_ENDPOINT.UPDATE}/${id}`, payload);
        return res.data;
    },

    async getDetail(id: string) {
        const res = await instance.get<IAxiosResponse<ISize>>(`${SIZE_ENDPOINT.DETAIL}/${id}`);
        return res.data;
    },
};

export default sizeService;

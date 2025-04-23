import { COLOR_ENDPOINT } from '~/constants/endPoint';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { IColor, IColorFormData, IColorResponse } from '~/types/Color';
import instance from '~/utils/api/axiosInstance';
import { Params } from 'react-router-dom';

const colorService = {
    async getAll(params: Params) {
        const res = await instance.get<IColorResponse>(`${COLOR_ENDPOINT.ALL}`, { params });
        return res.data;
    },
    async getAllColors() {
        const res = await instance.get<
            IAxiosResponse<
                {
                    _id: string;
                    name: string;
                    hex: string;
                }[]
            >
        >(`${COLOR_ENDPOINT.ALL}`);
        return res.data;
    },
    async createColor(payload: IColorFormData) {
        const res = await instance.post<IAxiosResponse<IColor>>(`${COLOR_ENDPOINT.CREATE}`, payload);
        return res.data;
    },
    async updateColor(id: string, payload: IColorFormData) {
        const res = await instance.patch<IAxiosResponse<IColor>>(`${COLOR_ENDPOINT.UPDATE}/${id}`, payload);
        return res.data;
    },

    async getDetail(id: string) {
        const res = await instance.get<IAxiosResponse<IColor>>(`${COLOR_ENDPOINT.DETAIL}/${id}`);
        return res.data;
    },
};

export default colorService;

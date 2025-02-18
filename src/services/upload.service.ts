import { AxiosResponse } from 'axios';
import instance from '~/utils/api/axiosInstance';
type Res = {
    downloadURL: string;
    urlRef: string;
};
export const uploadService = {
    async uploadImage(body: FormData) {
        const { data } = await instance.post<FormData, AxiosResponse<Res>>('/uploads/image', body);
        return data;
    },
};

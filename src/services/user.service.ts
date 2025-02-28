import { IAxiosResponse } from '~/types/AxiosResponse';
import { IUserProfileResponse } from '~/types/User';
import { USER_ENDPOINT } from '~/constants/endPoint';
import instance from '~/utils/api/axiosInstance';

export const userService = {
    async getAllOrder() {
        // const rest = await instance.get()
    },

    async getProfile() {
        const res = await instance.get<IAxiosResponse<IUserProfileResponse>>(`${USER_ENDPOINT.PROFILE}`);
        return res.data;
    },
};

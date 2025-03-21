import { IUserProfileResponse } from '~/types/User';
import { USER_ENDPOINT } from '~/constants/endPoint';
import instance from '~/utils/api/axiosInstance';

export const userService = {
    async getAllOrder() {
        // const rest = await instance.get()
    },

    async getProfile() {
        const res = await instance.get<IUserProfileResponse>(`${USER_ENDPOINT.PROFILE}`);
        return res.data;
    },

    async updateProfile(payload: FormData) {
        const res = await instance.put(`${USER_ENDPOINT.UPDATE}`, payload);
        return res.data;
    },
};

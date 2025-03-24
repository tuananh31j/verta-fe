import { USER_ENDPOINT } from '~/constants/endPoint';
import { IUserProfileResponse, IUserResponse } from '~/types/User';
import instance from '~/utils/api/axiosInstance';

export const userService = {
    async getAllOrder() {
        // const rest = await instance.get()
    },

    async getAllUsers() {
        const { data } = await instance.get<IUserResponse>(`${USER_ENDPOINT.ALL}`);
        return data;
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

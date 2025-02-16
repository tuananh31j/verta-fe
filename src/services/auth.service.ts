import { IServerResponse } from '~/interfaces/api';
import { ILoginPayload, ILoginResponse, IRegisterPayload } from '~/interfaces/auth';
import instance from '~/utils/api/axiosInstance';

export const authService = {
    async register(body: IRegisterPayload) {
        const data = await instance.post<IRegisterPayload>('/auth/register', body);
        return data;
    },
    async login(body: ILoginPayload) {
        const data = await instance.post<ILoginPayload, IServerResponse<ILoginResponse>>('/auth/login', body);
        return data;
    },
    async sendVerifyEmail(body: { email: string }) {
        const data = await instance.post<{ email: string }, IServerResponse<null>>('/auth/sendVerify', body);
        return data;
    },
};

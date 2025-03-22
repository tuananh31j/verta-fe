import { Params } from '~/types/Api';
import { IVoucher, IVoucherDTO } from '~/types/Voucher';
import instance from '~/utils/api/axiosInstance';

export const voucherService = {
    async getAllVoucherForAdmin(params: Params) {
        const res = await instance.get<{
            vouchers: IVoucher[];
            totalDocs: number;
        }>(`/voucher/admin/all`, { params });
        return res.data;
    },
    async getDetails(id: string) {
        const res = await instance.get<IVoucher>(`/voucher/details/${id}`);
        return res.data;
    },

    async createVoucher(data: IVoucherDTO) {
        const res = await instance.post<IVoucherDTO>(`/voucher/create`, data);
        return res.data;
    },

    async updateVoucher(id: string, data: IVoucherDTO) {
        const res = await instance.put<IVoucherDTO>(`/voucher/update/${id}`, data);
        return res.data;
    },
    async updateStatus(id: string) {
        const res = await instance.patch(`voucher/update-status/${id}`);
        return res.data;
    },
    async getVoucherForNewAccount() {
        const res = await instance.get<IVoucher[]>(`/voucher/new-user`);
        return res.data;
    },
    async getVoucherUser() {
        const res = await instance.get<IVoucher[]>(`/voucher/all`);
        return res.data;
    },
};

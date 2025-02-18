import { SHIPPING_ENDPOINT } from '~/constants/endPoint';
import instance from '~/utils/api/axiosInstance';
interface IResponseProvinces {
    ProvinceID: number;
    ProvinceName: string;
}
export const shippingService = {
    async getProvinces() {
        const { data } = await instance.get<IResponseProvinces[]>(SHIPPING_ENDPOINT.PROVINCES);
        return data;
    },
    async getDistrict(id: number) {
        const { data } = await instance.get(`${SHIPPING_ENDPOINT.DISTRICT}?provinceId=${id}`);
        return data;
    },
    async getWard(id: number) {
        const { data } = await instance.get(`${SHIPPING_ENDPOINT.WARD}?districtId=${id}`);
        return data;
    },
};

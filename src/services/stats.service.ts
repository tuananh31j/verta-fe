import dayjs, { Dayjs } from 'dayjs';
import { STATS_ENDPOINT } from '~/constants/endPoint';
import { IServerResponse } from '~/interfaces/api';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { IOrderStatsResponse, IPendingTask, ITotalStatsResponse } from '~/types/Stats';
import instance from '~/utils/api/axiosInstance';

type DateInput =
    | { type: 'single'; date: string }
    | { type: 'range'; start: string; end: string }
    | { type: 'monthly'; year: number; month: number }
    | { type: 'yearly'; year: number };

const statsService = {
    async getOrderAndRevenueByRange(startDate: Dayjs, endDate: Dayjs) {
        if (!startDate || !endDate) {
            return { data: [] };
        }

        const { data } = await instance.get<IAxiosResponse<IOrderStatsResponse>>(`${STATS_ENDPOINT.DATE_RANGE}`, {
            params: {
                startDate: startDate.format('DD-MM-YYYY'),
                endDate: endDate.format('DD-MM-YYYY'),
            },
        });
        return data;
    },
    async getPendingTask() {
        const data: IServerResponse<{ data: IPendingTask }> = await instance.get(`${STATS_ENDPOINT.PENDING_TASK}`);
        return data;
    },
    async getProductByRange(startDate: Dayjs, endDate: Dayjs) {
        if (!startDate || !endDate) {
            return { data: [] };
        }

        const { data } = await instance.get(`${STATS_ENDPOINT.PRODUCTS}`, {
            params: {
                startDate: startDate.format('DD-MM-YYYY'),
                endDate: endDate.format('DD-MM-YYYY'),
            },
        });
        return data;
    },
    async getTotalStatsByDateInput(dateInput: DateInput) {
        let params: any = {};

        switch (dateInput.type) {
            case 'single':
                params = { dateFilter: 'single', startDate: dayjs(dateInput.date).format('DD-MM-YYYY') };
                break;
            case 'range':
                params = {
                    dateFilter: 'range',
                    startDate: dayjs(dateInput.start).format('DD-MM-YYYY'),
                    endDate: dayjs(dateInput.end).format('DD-MM-YYYY'),
                };
                break;
            case 'monthly':
                params = { dateFilter: 'monthly', month: dateInput.month, year: dateInput.year };
                break;
            case 'yearly':
                params = { dateFilter: 'yearly', year: dateInput.year };
                break;
            default:
                throw new Error('Invalid date input type');
        }

        const { data } = await instance.get<IAxiosResponse<ITotalStatsResponse>>(`${STATS_ENDPOINT.TOTAL}`, { params });
        return data;
    },
    async getTopBuyers(
        dateFilter: string,
        startDate?: dayjs.Dayjs,
        endDate?: dayjs.Dayjs,
        month?: number,
        year?: number
    ) {
        const params: any = { dateFilter };

        if (startDate) params.startDate = startDate.format('DD-MM-YYYY');
        if (endDate) params.endDate = endDate.format('DD-MM-YYYY');
        if (month) params.month = month;
        if (year) params.year = year;

        const { data } = await instance.get<IAxiosResponse<any>>(`${STATS_ENDPOINT.TOP_BUYERS}`, { params });
        return data;
    },
};

export default statsService;

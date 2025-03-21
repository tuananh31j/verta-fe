import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import statsService from '~/services/stats.service';
import dayjs from 'dayjs';

type DateInput =
    | { type: 'range'; start: string; end: string }
    | { type: 'monthly'; year: number; month: number }
    | { type: 'yearly'; year: number };

export const useTopBuyers = (dateInput: DateInput) => {
    return useQuery({
        queryKey: [QUERY_KEY.TOP_BUYERS, dateInput],
        queryFn: async () => {
            let dateFilter: string;
            let startDate: dayjs.Dayjs | undefined;
            let endDate: dayjs.Dayjs | undefined;
            let month: number | undefined;
            let year: number | undefined;

            switch (dateInput.type) {
                case 'range':
                    dateFilter = 'range';
                    startDate = dayjs(dateInput.start);
                    endDate = dayjs(dateInput.end);
                    break;
                case 'monthly':
                    dateFilter = 'monthly';
                    month = dateInput.month;
                    year = dateInput.year;
                    break;
                case 'yearly':
                    dateFilter = 'yearly';
                    year = dateInput.year;
                    break;
                default:
                    throw new Error('Invalid date input type');
            }

            return statsService.getTopBuyers(dateFilter, startDate, endDate, month, year);
        },
    });
};

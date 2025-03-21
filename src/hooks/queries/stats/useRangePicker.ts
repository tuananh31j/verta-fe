import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import statsService from '~/services/stats.service';
import { Dayjs } from 'dayjs';

export const UseRangePicker = (startDate: Dayjs | null, endDate: Dayjs | null) => {
    return useQuery({
        queryKey: [QUERY_KEY.DATE_RANGE, startDate, endDate],
        queryFn: () => statsService.getOrderAndRevenueByRange(startDate!, endDate!),
        enabled: !!startDate && !!endDate,
    });
};

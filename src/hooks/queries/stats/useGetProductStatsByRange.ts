import { useQuery } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';
import { QUERY_KEY } from '~/constants/queryKey';
import statsService from '~/services/stats.service';

const useGetProductStatsByRange = (startDate: Dayjs, endDate: Dayjs) => {
    return useQuery({
        queryKey: [QUERY_KEY.PRODUCT_STATS, startDate, endDate],
        queryFn: () => statsService.getProductByRange(startDate, endDate),
    });
};

export default useGetProductStatsByRange;

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import statsService from '~/services/stats.service';

export const useGetPendingTask = () => {
    return useQuery({
        queryKey: [QUERY_KEY.PENDING_TASK],
        queryFn: () => statsService.getPendingTask(),
    });
};

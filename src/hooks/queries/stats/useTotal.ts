import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import statsService from '~/services/stats.service';

type DateInput =
    | { type: 'single'; date: string }
    | { type: 'range'; start: string; end: string }
    | { type: 'monthly'; year: number; month: number }
    | { type: 'yearly'; year: number };

export const useTotalStats = (dateInput: DateInput) => {
    return useQuery({
        queryKey: [QUERY_KEY.TOTAL_STATS, dateInput],
        queryFn: () => statsService.getTotalStatsByDateInput(dateInput),
    });
};

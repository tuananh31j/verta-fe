import { QUERY_KEY } from '~/constants/queryKey';
import colorService from '~/services/color.service';
import { Params } from '~/types/Api';
import { useQuery } from '@tanstack/react-query';

const useGetColors = (params: Params) => {
    return useQuery({
        queryKey: [QUERY_KEY.COLORS, ...Object.values(params)],
        queryFn: () => colorService.getAll(params),
    });
};

export default useGetColors;

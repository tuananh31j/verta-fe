import { QUERY_KEY } from '~/constants/queryKey';
import colorService from '~/services/color.service';
import { useQuery } from '@tanstack/react-query';

const useGetAllColors = () => {
    return useQuery({
        queryKey: [QUERY_KEY.COLORS],
        queryFn: () => colorService.getAllColors(),
    });
};

export default useGetAllColors;

import { QUERY_KEY } from '~/constants/queryKey';
import sizeService from '~/services/size.service';
import { useQuery } from '@tanstack/react-query';
import { Params } from '~/types/Api';

const useGetAllSizes = (params: Params) => {
    return useQuery({
        queryKey: [QUERY_KEY.SIZES, ...Object.values(params || {}), ...Object.keys(params || {})],
        queryFn: () => sizeService.getAll(params),
    });
};

export default useGetAllSizes;

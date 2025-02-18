import { QUERY_KEY } from '~/constants/queryKey';
import sizeService from '~/services/size.service';
import { Params } from '~/types/Api';
import { useQuery } from '@tanstack/react-query';

const useGetSizes = (params: Params) => {
    return useQuery({
        queryKey: [QUERY_KEY.SIZES, ...Object.values(params)],
        queryFn: () => sizeService.getAll(params),
    });
};

export default useGetSizes;

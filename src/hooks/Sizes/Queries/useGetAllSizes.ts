import { QUERY_KEY } from '~/constants/queryKey';
import sizeService from '~/services/size.service';
import { useQuery } from '@tanstack/react-query';

const useGetAllSizes = () => {
    return useQuery({
        queryKey: [QUERY_KEY.SIZES],
        queryFn: () => sizeService.getAllSizes(),
    });
};

export default useGetAllSizes;

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import sizeService from '~/services/size.service';

const useGetDetailSize = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.SIZES, id],
        queryFn: async () => {
            const res = await sizeService.getDetail(id);
            return res;
        },
        enabled: !!id,
    });
};

export default useGetDetailSize;

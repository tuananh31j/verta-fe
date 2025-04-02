import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { userService } from '~/services/user.service';

const useGetDetailStatusAccount = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.USERS],
        queryFn: () => userService.detailTimeLineAccount(id),
        enabled: !!id,
    });
};

export default useGetDetailStatusAccount;

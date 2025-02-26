import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { userService } from '~/services/user.service';

const useGetProfile = () => {
    return useQuery({
        queryKey: [QUERY_KEY.PROFILE, QUERY_KEY.USERS],
        queryFn: () => userService.getProfile(),
        refetchOnMount: true,
    });
};

export default useGetProfile;

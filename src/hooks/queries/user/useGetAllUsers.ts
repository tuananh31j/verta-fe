import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import { userService } from '~/services/user.service';

const useGetAllUsers = () => {
    return useQuery({
        queryKey: [QUERY_KEY.USERS],
        queryFn: () => userService.getAllUsers(),
    });
};

export default useGetAllUsers;

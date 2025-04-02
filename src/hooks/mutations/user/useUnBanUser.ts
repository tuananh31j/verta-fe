import { userService } from '~/services/user.service';
import { useToast } from '~/context/ToastProvider';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';

export const useUnBanAccount = () => {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['unBanUser'],
        mutationFn: (body: { userId: string }) => userService.unBanAccount(body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.USERS],
            });
            toast('success', 'Mở khóa tài khoản thành công!!');
        },
    });
};

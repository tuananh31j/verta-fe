import { userService } from '~/services/user.service';
import { useToast } from '~/context/ToastProvider';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';

export const useBanAccount = () => {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['banUser'],
        mutationFn: (body: { userId: string; reason: string }) => userService.banAccount(body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.USERS],
            });
            toast('success', 'Khóa tài khoản thành công!!');
        },
        onError(error: any) {
            toast('error', error.errors?.[0].message);
            console.log(error);
        },
    });
};

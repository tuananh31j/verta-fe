import { QUERY_KEY } from '~/constants/queryKey';
import { userService } from '~/services/user.service';
import { useToast } from '~/context/ToastProvider';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useMutationUpdateProfle = () => {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [QUERY_KEY.USERS],
        mutationFn: (payload: any) => userService.updateProfile(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.PROFILE, QUERY_KEY.USERS],
            });
            toast('success', 'Tài khoản của bạn đã được cập nhật thành công!!');
        },
    });
};

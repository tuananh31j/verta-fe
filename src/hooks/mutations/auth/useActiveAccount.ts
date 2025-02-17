import { useMutation } from '@tanstack/react-query';
import { authService } from '~/services/auth.service';

export const useActiveAccount = () => {
    return useMutation({
        mutationKey: ['ACCTIVE_ACCOUNT'],
        mutationFn: (body: { token: string }) => authService.activeAccount(body),
    });
};

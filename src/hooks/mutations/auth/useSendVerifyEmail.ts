import { useMutation } from '@tanstack/react-query';
import { useToast } from '~/context/ToastProvider';
import { authService } from '~/services/auth.service';

export const useSendVerifyEmail = () => {
    const toast = useToast();
    return useMutation({
        mutationKey: ['SENDVERIFY'],
        mutationFn: (body: { email: string }) => authService.sendVerifyEmail(body),
        onSuccess: (data) => {
            toast('success', data.message);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (err: any) => {
            if (err.message) {
                toast('info', err.message);
            }
        },
    });
};

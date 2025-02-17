import { useMutation } from '@tanstack/react-query';
import { useToast } from '~/context/ToastProvider';
import { IRegisterPayload } from '~/interfaces/auth';
import { authService } from '~/services/auth.service';

export const useRegister = () => {
    const toast = useToast();
    return useMutation({
        mutationKey: ['REGISTER'],
        mutationFn: (data: IRegisterPayload) => authService.register(data),
        onSuccess: () => {
            toast('success', 'Đăng ký thành công chúng tôi đã gửi cho bạn email kích hoạt tài khoản');
        },
    });
};

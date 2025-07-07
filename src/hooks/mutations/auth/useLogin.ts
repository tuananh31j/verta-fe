import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '~/context/ToastProvider';
import { ILoginPayload } from '~/interfaces/auth';
import { authService } from '~/services/auth.service';
import { login } from '~/store/slice/authSlice';
import { useAppDispatch } from '~/store/store';

export const useLogin = () => {
    const toast = useToast();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ['LOGIN'],
        mutationFn: (body: ILoginPayload) => authService.login(body),
        onSuccess(data) {
            toast('success', data.message);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            dispatch(login(data.data as any));
            const user = {
                name: data.data.name,
                role: data.data.role,
                _id: data.data._id,
                email: data.data.email,
                avatar: data.data.avatar,
            };
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('accessToken', data.data.accessToken as string);
            navigate('/');
        },
    });
};

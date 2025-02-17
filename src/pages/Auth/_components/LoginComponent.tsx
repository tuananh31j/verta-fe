import { zodResolver } from '@hookform/resolvers/zod';
import { ConfigProvider, Form, Input, Spin } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useLogin } from '~/hooks/mutations/auth/useLogin';
import { useSendVerifyEmail } from '~/hooks/mutations/auth/useSendVerifyEmail';
import { LoginFormType, loginSchema } from '~/validations/auth/AuthValidation';

export default function LoginComponent() {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
        getValues,
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const { mutate, isPending } = useLogin();
    const { mutate: mutateSendVerify, isPending: pendingVerify } = useSendVerifyEmail();
    const onFinish = (data: LoginFormType) => {
        mutate(data, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (err: any) => {
                if (err.errors) {
                    err.errors.forEach((item: { field: keyof LoginFormType; message: string }) => {
                        setError(item.field, { type: 'server', message: item.message });
                    });
                }
            },
        });
    };

    const handleResendEmail = () => {
        const email = getValues('email');
        if (!email) return;
        mutateSendVerify({ email });
    };

    return (
        <div className='w-full'>
            <div className='mb-8'>
                <h3 className='text-3xl font-bold uppercase'>Đăng nhập</h3>
                <p className='mt-4 text-sm'>
                    Nếu bạn đã có tài khoản, hãy đăng nhập để tích lũy điểm thành viên và nhận được những ưu đãi tốt
                    hơn!
                </p>
            </div>
            <ConfigProvider
                theme={{
                    components: {
                        Input: {
                            activeBorderColor: '#d9d9d9',
                            hoverBorderColor: '#d9d9d9',
                            activeShadow: 'none',
                            borderRadius: 3,
                        },
                    },
                    token: {
                        colorBorder: '#e7e7e7',
                    },
                }}
            >
                <Form onFinish={handleSubmit(onFinish)} layout='vertical' autoComplete='off'>
                    <Form.Item
                        label={<span className='text-sm text-[#8a8a8f]'>Email</span>}
                        validateStatus={errors.email ? 'error' : ''}
                        help={
                            errors.email?.message === 'Tài khoản bạn chưa được kích hoạt!' ? (
                                <div>
                                    <span className='text-red-500'>{errors.email.message}</span>
                                    <button
                                        disabled={pendingVerify}
                                        type='button'
                                        onClick={handleResendEmail}
                                        className='ml-2 cursor-pointer text-blue-500 hover:underline'
                                    >
                                        Gửi lại email kích hoạt
                                    </button>
                                </div>
                            ) : (
                                errors.email?.message
                            )
                        }
                    >
                        <Controller
                            name='email'
                            control={control}
                            render={({ field }) => <Input {...field} className='min-h-[40px]' placeholder='Email' />}
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span className='text-sm text-[#8a8a8f]'>Mật khẩu</span>}
                        validateStatus={errors.password ? 'error' : ''}
                        help={errors.password?.message}
                    >
                        <Controller
                            name='password'
                            control={control}
                            render={({ field }) => (
                                <Input.Password {...field} className='min-h-[40px]' placeholder='Mật khẩu' />
                            )}
                        />
                    </Form.Item>
                    <div className='mb-4 flex justify-end'>
                        <Link to={'/'} className='text-[#007aff]'>
                            Quên mật khẩu
                        </Link>
                    </div>

                    <Form.Item label={null}>
                        <button
                            type='submit'
                            disabled={isPending}
                            className='flex h-[41px] w-full cursor-pointer items-center justify-center bg-black font-medium text-white uppercase'
                        >
                            {isPending ? <Spin /> : 'Đăng nhập'}
                        </button>
                    </Form.Item>
                </Form>
            </ConfigProvider>
        </div>
    );
}

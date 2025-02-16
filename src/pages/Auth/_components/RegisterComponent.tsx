import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, ConfigProvider, Form, Input, Spin } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useRegister } from '~/hooks/mutations/auth/useRegister';
import { RegisterFormType, registerSchema } from '~/validations/auth/AuthValidation';

export default function RegisterComponent() {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        resolver: zodResolver(registerSchema),
    });
    const { mutate, isPending } = useRegister();
    const onFinish = (data: RegisterFormType) => {
        console.log(data);
        const payload = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password,
        };
        mutate(payload, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (err: any) => {
                if (err.errors) {
                    err.errors.forEach((item: { field: keyof RegisterFormType; message: string }) => {
                        setError(item.field, { type: 'server', message: item.message });
                    });
                }
            },
        });
    };
    return (
        <div className='w-full'>
            <div className='mb-8'>
                <h3 className='text-3xl font-bold uppercase'>Đăng ký</h3>
                <p className='mt-4 text-sm'>
                    Hãy đăng ký ngay để tích lũy điểm thành viên và nhận được những ưu đãi tốt hơn!
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
                        label={<span className='text-sm text-[#8a8a8f]'>Họ và tên</span>}
                        validateStatus={errors.name ? 'error' : ''}
                        help={errors.name?.message}
                    >
                        <Controller
                            name='name'
                            control={control}
                            render={({ field }) => <Input {...field} className='min-h-[40px]' placeholder='Tên' />}
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span className='text-sm text-[#8a8a8f]'>Email</span>}
                        validateStatus={errors.email ? 'error' : ''}
                        help={errors.email?.message}
                    >
                        <Controller
                            name='email'
                            control={control}
                            render={({ field }) => <Input {...field} className='min-h-[40px]' placeholder='Email' />}
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span className='text-sm text-[#8a8a8f]'>Số điện thoại</span>}
                        validateStatus={errors.phone ? 'error' : ''}
                        help={errors.phone?.message}
                    >
                        <Controller
                            name='phone'
                            control={control}
                            render={({ field }) => (
                                <Input {...field} className='min-h-[40px]' placeholder='Số điện thoại' />
                            )}
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
                    <Form.Item
                        label={<span className='text-sm text-[#8a8a8f]'>Xác nhận mật khẩu</span>}
                        validateStatus={errors.confirmPassword ? 'error' : ''}
                        help={errors.confirmPassword?.message}
                    >
                        <Controller
                            name='confirmPassword'
                            control={control}
                            render={({ field }) => (
                                <Input.Password {...field} className='min-h-[40px]' placeholder='Mật khẩu' />
                            )}
                        />
                    </Form.Item>
                    <Form.Item validateStatus={errors.policy ? 'error' : ''} help={errors.policy?.message}>
                        <Controller
                            name='policy'
                            control={control}
                            render={({ field }) => (
                                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                                    Đồng ý với điều khoản của VERTA
                                </Checkbox>
                            )}
                        />
                    </Form.Item>
                    <Form.Item label={null}>
                        <button
                            type='submit'
                            disabled={isPending}
                            className='flex h-[41px] w-full cursor-pointer items-center justify-center bg-black font-medium text-white uppercase'
                        >
                            {isPending ? <Spin /> : 'Đăng ký'}
                        </button>
                    </Form.Item>
                </Form>
            </ConfigProvider>
        </div>
    );
}

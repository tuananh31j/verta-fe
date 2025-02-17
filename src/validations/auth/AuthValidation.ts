import { z } from 'zod';

export const registerSchema = z
    .object({
        name: z
            .string({ message: 'Họ và tên không được để trống' })
            .min(2, { message: 'Họ và tên phải có ít nhất 2 ký tự' })
            .max(20, { message: 'Họ và tên phải có dưới 20 ký tự' }),
        email: z.string({ message: 'Email không được để trống' }).email('Email không hợp lệ'),
        phone: z
            .string({ message: 'Số điện thoại không được để trống' })
            .min(6, { message: 'Số điện thoại phải có ít nhất 6 ký tự' }),
        password: z.string({ message: 'Mật khẩu không được để trống' }).min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
        confirmPassword: z.string({ message: 'Mật khẩu không được để trống' }),
        policy: z.literal(true, {
            errorMap: () => ({ message: 'Bạn phải đồng ý với điều khoản' }),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Mật khẩu xác nhận không khớp',
        path: ['confirmPassword'],
    });

export type RegisterFormType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.string({ message: 'Email không được để trống' }).email('Email không hợp lệ'),
    password: z.string({ message: 'Mật khẩu không được để trống' }).min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export type LoginFormType = z.infer<typeof loginSchema>;

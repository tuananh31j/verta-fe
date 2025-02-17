/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useActiveAccount } from '~/hooks/mutations/auth/useActiveAccount';
import { useSendVerifyEmail } from '~/hooks/mutations/auth/useSendVerifyEmail';
type message = {
    type: string;
    title: string;
    descriptionOne: string;
    descriptionTwo: string;
};
export default function VerifyAccount() {
    const { mutate, isPending } = useActiveAccount();
    const { mutate: mutateSendVerify, isPending: pendingVerify } = useSendVerifyEmail();
    const [typeResponse, setTypeResponse] = useState<null | 'expired' | 'invalid' | 'success' | 'undefined'>(null);
    const [message, setMessage] = useState<message | null>(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('tk');
    const email = searchParams.get('email');
    useEffect(() => {
        if (token) {
            mutate(
                { token },
                {
                    onSuccess: (data: any) => {
                        setTypeResponse(data.data.type);
                        setMessage(data.data);
                    },
                    onError: (err: any) => {
                        setTypeResponse(err.data.type);
                        setMessage(err.data);
                    },
                }
            );
        }
    }, [mutate, token]);
    const handleClickSendMail = () => {
        if (email) {
            mutateSendVerify({ email });
        }
    };
    const handleNavigate = () => {
        navigate('/auth');
    };
    return (
        <>
            {isPending ? (
                <div className='flex min-h-[70vh] items-center justify-center'>
                    <Spin />
                </div>
            ) : (
                <div className='mx-6 min-h-[80vh] max-w-7xl xl:mx-auto'>
                    <div className='mt-12 flex flex-col items-center justify-center'>
                        <h3 className='text-center text-xl font-medium'>Xác thực tài khoản</h3>
                        <div className='mt-4 flex flex-col items-center gap-3'>
                            {typeResponse !== 'success' ? (
                                <img
                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxudDCfEVSnW-Wn9GBbhrOX3xB8CpuCA0z3w&s'
                                    alt=''
                                    className='w-32'
                                />
                            ) : (
                                <img
                                    src='https://static.vecteezy.com/system/resources/previews/004/459/449/non_2x/email-confirmation-color-icon-e-mail-approval-response-hiring-letter-email-with-check-mark-employment-verification-letter-isolated-illustration-vector.jpg'
                                    alt=''
                                    className='w-32'
                                />
                            )}
                            <h3
                                className={`${typeResponse !== 'success' ? 'text-red-500' : 'text-black'} flex text-lg font-medium`}
                            >
                                {message?.title}
                            </h3>
                            <p>{message?.descriptionOne}</p>
                            <p>{message?.descriptionTwo}</p>
                            {typeResponse !== 'success' ? (
                                <button
                                    onClick={handleClickSendMail}
                                    disabled={pendingVerify}
                                    className='mt-4 flex h-10 cursor-pointer items-center justify-center rounded-md border border-red-500 px-4 text-red-500 hover:opacity-60'
                                >
                                    {pendingVerify ? <Spin /> : 'Gửi lại'}
                                </button>
                            ) : (
                                <button
                                    onClick={handleNavigate}
                                    className='mt-4 cursor-pointer rounded-md border border-black px-4 py-1.5 hover:opacity-60'
                                >
                                    Bắt đầu
                                </button>
                            )}
                            <p className='mt-4 text-[#8f8f8f]'>
                                VERTA SPORT cung cấp địa điểm mua sắm trực tiếp uy tín, đảm bảo, chất lượng
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

import { Button, Divider, Form, FormProps, Input } from 'antd';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BreadcrumbDisplay from '~/components/_common/BreadcrumbDisplay';
import { useTypedSelector } from '~/store/store';

type Props = {};

const Profile = (props: Props) => {
    const username = useTypedSelector((state) => state.auth.user?.name);

    // const { mutate: updateProfile, isPending } = useMutationUpdateProfle();

    const [form] = Form.useForm();

    // const { data } = useGetProfile();
    // const profile = data?.data;

    type FieldType = {
        name: string;
        country: string;
        phone: string;
    };

    // Function khi submit form
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        const formDataUpdateProfile = new FormData();

        formDataUpdateProfile.append('name', values.name);
        formDataUpdateProfile.append('email', values.country);
        formDataUpdateProfile.append('phone', values.phone);

        // updateProfile(formDataUpdateProfile);
    };

    // Fill thông tin vào form nếu api trả về profile thành công
    // useEffect(() => {
    //     if (profile) {
    //         form.setFieldsValue({
    //             name: profile.name,
    //             phone: profile.phone,
    //             email: profile.email,
    //         });
    //     }
    // }, [profile, form]);

    return (
        <div className='w-full max-w-7xl xl:mx-auto'>
            {/* BREADCRUMB */}
            <BreadcrumbDisplay />

            {/* SIDE BAR */}
            <div className='flex flex-col justify-between lg:flex-row'>
                <div className='relative h-[100vh] basis-[25%] p-3'>
                    <h3 className='my-4 text-3xl'>
                        Xin chào, <span className='text-3xl font-bold uppercase'>{username}</span>
                    </h3>

                    <ul>
                        <li>
                            <Link to='/account/profile' className='text-sm leading-7'>
                                Thông tin tài khoản
                            </Link>
                        </li>

                        <li>
                            <Link to='/account/my-orders' className='text-sm leading-7'>
                                Quản lý đơn hàng
                            </Link>
                        </li>

                        <li>
                            <Link to='/' className='text-sm leading-7'>
                                Thông tin giao hàng
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className='basis-[75%]'>
                    {/* PROFILE FORM */}
                    <div className='pt-20'>
                        <div className='border-l-2 border-l-[#efeff4] pl-10'>
                            <Form form={form} layout='vertical' className='w-[582px]' onFinish={onFinish}>
                                <Form.Item<FieldType>
                                    label='Họ tên'
                                    className='mt-1 text-sm text-[#070707]'
                                    name='name'
                                >
                                    <Input
                                        placeholder='Họ tên'
                                        style={{ backgroundColor: '#efeff4', borderRadius: 0 }}
                                        className='h-[48px] py-3 text-sm leading-[48px] text-[#070707]'
                                    />
                                </Form.Item>

                                <Form.Item<FieldType>
                                    label='Quốc gia'
                                    className='mt-1 text-sm text-[#070707]'
                                    name='country'
                                >
                                    <Input
                                        placeholder='Quốc gia'
                                        style={{ backgroundColor: '#efeff4', borderRadius: 0 }}
                                        className='h-[48px] py-3 text-sm leading-[48px] text-[#070707]'
                                    />
                                </Form.Item>

                                <Form.Item<FieldType>
                                    label='Số điện thoại'
                                    className='mt-1 text-sm text-[#070707]'
                                    name='phone'
                                >
                                    <Input
                                        placeholder='Số điện thoại'
                                        style={{ backgroundColor: '#efeff4', borderRadius: 0 }}
                                        className='h-[48px] py-3 text-sm leading-[48px] text-[#070707]'
                                    />
                                </Form.Item>

                                {/* <Form.Item>
                                <div className='flex flex-wrap justify-between gap-5 md:flex-nowrap'>
                                    <Button
                                        className='block w-full rounded-3xl bg-black text-center text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'
                                        size='large'
                                        htmlType='submit'
                                        loading={isPending}
                                    >
                                        Cập nhật thông tin
                                    </Button>

                                    {profile && (
                                        <Button
                                            type='primary'
                                            size='large'
                                            danger
                                            // onClick={showModal}
                                            onClick={() => sendResetPassword({ email: profile.email! })}
                                            className='w-full rounded-3xl'
                                            loading={isPendingPassword}
                                        >
                                            Thay đổi mật khẩu
                                        </Button>
                                    )}
                                </div>
                            </Form.Item> */}
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfigProvider, Form, Input, Select } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useGetProvinces } from '~/hooks/queries/shipping/useGetProvinces';
import { setCustomerInfo, setShippingAddress } from '~/store/slice/checkoutSlice';
import { useAppDispatch, useTypedSelector } from '~/store/store';
import DistrictSelectList from './_components/DistrictSelect';
import WardSelectList from './_components/WardSelect';
export default function ShippingAddress() {
    const customerInfor = useTypedSelector((state) => state.checkOut.customerInfor);
    const shippingAddress = useTypedSelector((state) => state.checkOut.shippingAddress);
    const isValidCustomer = Object.values(customerInfor).every((value) => value.trim() !== '');
    const isValidAddress = Object.values(shippingAddress).every((value) =>
        typeof value === 'string' ? value.trim() !== '' : value !== null
    );
    const user = useTypedSelector((state) => state.auth.user);
    const [form] = Form.useForm();
    const { data: provinces } = useGetProvinces();
    const dispatch = useAppDispatch();
    const handleSelectProvinceChange = (value: string, option: any) => {
        if (!option) {
            dispatch(setShippingAddress({ provinceId: null, province: '' }));
        } else {
            dispatch(setShippingAddress({ provinceId: +value, province: option.label }));
        }
        dispatch(setShippingAddress({ district: '', districtId: null, ward: '', wardCode: '' }));
        form.setFieldsValue({
            districtId: null,
            wardCode: '',
            ward: '',
            district: '',
        });
    };
    const onChangeAddressInput = (value: string) => {
        if (value.length > 3) {
            dispatch(setShippingAddress({ address: value }));
        } else {
            dispatch(setShippingAddress({ address: '' }));
        }
    };
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        const payload = {
            name: values.name,
            email: values.email,
            phone: values.phone,
        };
        dispatch(setCustomerInfo(payload));
        navigate('/checkout/payment');
    };
    return (
        <div>
            {/* BREADCRUMB */}
            <div className='flex items-center gap-2 text-xs'>
                <Link className='text-[#338dbc] duration-300 hover:text-cyan-500' to={'/cart/detail'}>
                    Giỏ hàng
                </Link>
                &gt;
                <span className='text-black'>Thông tin vận chuyển</span>
                {isValidCustomer && isValidAddress && (
                    <>
                        &gt;
                        <Link className='text-[#338dbc] duration-300 hover:text-cyan-500' to={'/cart/detail'}>
                            Phương thức thanh toán
                        </Link>
                    </>
                )}
            </div>
            <h3 className='my-4 text-lg font-semibold text-[#333333] uppercase'>Thông tin thanh toán</h3>
            <div className='pr-16'>
                <ConfigProvider
                    theme={{
                        components: {
                            Input: {
                                hoverBorderColor: '#8a8a8f',
                                activeShadow: 'none',
                                borderRadius: 3,
                            },
                            Select: {
                                hoverBorderColor: '#8a8a8f',
                                borderRadius: 3,
                            },
                        },
                        token: {
                            colorBorder: '#8a8a8f',
                        },
                    }}
                >
                    <Form form={form} onFinish={onFinish} layout='vertical' autoComplete='off'>
                        <Form.Item
                            label='Họ và tên'
                            name='name'
                            initialValue={user ? user.name : ''}
                            rules={[
                                { required: true, message: <>Họ và tên không được để trống</> },
                                { min: 6, message: <>Họ và tên phải có ít nhất 6 ký tự</> },
                            ]}
                        >
                            <Input className='min-h-[40px]' placeholder='Họ và tên' />
                        </Form.Item>

                        <div className='flex items-center justify-between gap-5'>
                            <Form.Item
                                className='w-[50%]'
                                label='Email'
                                initialValue={user ? user.email : ''}
                                name='email'
                                rules={[
                                    { required: true, message: <>Email không được để trống</> },
                                    { type: 'email', message: <>Địa chỉ email không hợp lệ</> },
                                ]}
                            >
                                <Input className='min-h-[40px]' placeholder='Email' />
                            </Form.Item>

                            <Form.Item
                                className='w-[50%]'
                                label='Số điện thoại'
                                name='phone'
                                initialValue={user ? user.phone : ''}
                                rules={[
                                    { required: true, message: <>Số điện thoại không được để trống</> },
                                    {
                                        pattern: /^0\d{8,}$/,
                                        message: <>Bắt đầu bằng 0 và có ít nhất 9 ký tự</>,
                                    },
                                ]}
                            >
                                <Input className='min-h-[40px]' placeholder='Số điện thoại' />
                            </Form.Item>
                        </div>
                        <Form.Item
                            label='Địa chỉ'
                            name='address'
                            initialValue={shippingAddress ? shippingAddress.address : ''}
                            rules={[
                                { required: true, message: <>Địa chỉ không được để trống</> },
                                { min: 3, message: <>Địa chỉ phải có ít nhất 3 ký tự</> },
                            ]}
                        >
                            <Input
                                onChange={(e) => onChangeAddressInput(e.target.value)}
                                className='min-h-[40px]'
                                placeholder='Địa chỉ'
                            />
                        </Form.Item>
                        <div className='flex items-center gap-5'>
                            <Form.Item className='h-full w-[50%]' label='Tỉnh/Thành phố'>
                                <Form.Item
                                    initialValue={shippingAddress.provinceId}
                                    name='province'
                                    rules={[{ required: true, message: <></> }]}
                                >
                                    <Select
                                        options={provinces}
                                        className='min-h-[40px]'
                                        allowClear
                                        placeholder='Chọn Tỉnh/ Thành phố'
                                        onChange={handleSelectProvinceChange}
                                    />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item
                                className='w-[50%]'
                                label='Quận/Huyện'
                                rules={[{ required: true, message: <></> }]}
                                shouldUpdate={(prevValues: { province: number }, currentValues: { province: number }) =>
                                    prevValues.province !== currentValues.province
                                }
                            >
                                {({ getFieldValue }) => {
                                    const provinceId = getFieldValue('province');
                                    if (provinceId) {
                                        return <DistrictSelectList provinceId={provinceId} />;
                                    }
                                    return (
                                        <Form.Item name='districtId' rules={[{ required: true, message: <></> }]}>
                                            <Select
                                                placeholder='Chọn Quận/ Huyện'
                                                className='min-h-[40px]'
                                                options={[]}
                                                disabled
                                            />
                                        </Form.Item>
                                    );
                                }}
                            </Form.Item>
                            <Form.Item
                                className='w-[50%]'
                                label='Phường/Xã'
                                rules={[{ required: true, message: <></> }]}
                                shouldUpdate={(
                                    prevValues: { districtId: number },
                                    currentValues: { districtId: number }
                                ) => prevValues.districtId !== currentValues.districtId}
                            >
                                {({ getFieldValue }) => {
                                    const districtId = getFieldValue('districtId');

                                    if (districtId) {
                                        return <WardSelectList districtId={districtId} />;
                                    }
                                    return (
                                        <Form.Item name='wardCode' rules={[{ required: true, message: <></> }]}>
                                            <Select
                                                placeholder='Chọn Phường/ Xã'
                                                className='min-h-[40px]'
                                                options={[]}
                                                disabled
                                            />
                                        </Form.Item>
                                    );
                                }}
                            </Form.Item>
                        </div>

                        <Form.Item label={null}>
                            <div className='flex justify-between'>
                                <Link to={'/cart/detail'}>Giỏ hàng</Link>
                                <button
                                    type='submit'
                                    className='flex cursor-pointer items-center justify-center rounded-md bg-[#338dbc] px-4 py-4 text-xs font-medium text-white uppercase duration-300 hover:bg-cyan-500'
                                >
                                    Phương thức thanh toán
                                </button>
                            </div>
                        </Form.Item>
                    </Form>
                </ConfigProvider>
            </div>
        </div>
    );
}

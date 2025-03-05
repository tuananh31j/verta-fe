import React from 'react';
import { Card, Space } from 'antd';
import { UserOutlined, PhoneOutlined, MailOutlined, HomeOutlined, EnvironmentOutlined } from '@ant-design/icons';

interface Props {
    customerInfo: {
        name: string;
        email: string;
        phone: string;
    };
    shippingAddress: {
        country: string;
        province: string;
        district: string;
        ward: string;
        address: string;
    };
}

const InfoSection: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div className='flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3'>
        <div className='rounded-lg bg-white p-2 shadow-sm'>{icon}</div>
        <div>
            <p className='mb-1 text-sm text-gray-500'>{label}</p>
            <p className='text-base font-medium text-gray-800'>{value || '---'}</p>
        </div>
    </div>
);

const AddressSection: React.FC<{ address: string; location: string }> = ({ address, location }) => (
    <div className='flex items-start gap-3 rounded-xl border border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-3'>
        <div className='rounded-lg bg-white p-2 shadow-sm'>
            <EnvironmentOutlined className='text-lg text-blue-500' />
        </div>
        <div className='flex-1'>
            <p className='mb-1 text-sm text-gray-500'>Địa chỉ</p>
            <p className='mb-1 text-base font-medium text-gray-800'>{address}</p>
            <p className='text-sm text-gray-600'>{location}</p>
        </div>
    </div>
);

const CustomerInfo: React.FC<Props> = ({ customerInfo, shippingAddress }) => {
    const getFullAddress = () => {
        const parts = [
            shippingAddress?.address,
            shippingAddress?.ward,
            shippingAddress?.district,
            shippingAddress?.province,
            shippingAddress?.country,
        ].filter(Boolean);
        return parts.join(', ');
    };

    return (
        <Space direction='vertical' size='large' className='w-full'>
            <Card
                title={
                    <div className='flex items-center gap-2'>
                        <UserOutlined className='text-lg text-blue-500' />
                        <span className='text-lg font-semibold'>Thông tin khách hàng</span>
                    </div>
                }
                className='w-full rounded-2xl border-gray-100 shadow-sm'
            >
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                    <InfoSection
                        icon={<UserOutlined className='text-lg text-violet-500' />}
                        label='Tên khách hàng'
                        value={customerInfo?.name}
                    />
                    <InfoSection
                        icon={<MailOutlined className='text-lg text-pink-500' />}
                        label='Email'
                        value={customerInfo?.email}
                    />
                    <InfoSection
                        icon={<PhoneOutlined className='text-lg text-green-500' />}
                        label='Số điện thoại'
                        value={customerInfo?.phone}
                    />
                </div>
            </Card>

            <Card
                title={
                    <div className='flex items-center gap-2'>
                        <HomeOutlined className='text-lg text-orange-500' />
                        <span className='text-lg font-semibold'>Địa chỉ giao hàng</span>
                    </div>
                }
                className='w-full rounded-2xl border-gray-100 shadow-sm'
            >
                <AddressSection address={shippingAddress?.address} location={getFullAddress()} />
            </Card>
        </Space>
    );
};

export default CustomerInfo;

import React from 'react';
import { Card, Space, Input } from 'antd';
import { CreditCardFilled, PercentageOutlined, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

interface Props {
    serviceInfo: {
        paymentMethod: string;
        shippingFee: number;
        totalPrice: number;
        isPaid: boolean;
    };
    description: string;
}

const ServiceInfo: React.FC<Props> = ({ serviceInfo, description }) => {
    const getPaymentMethodLabel = (method: string) => {
        switch (method) {
            case 'cash':
                return 'Thanh toán khi nhận hàng';
            case 'card':
                return 'Thanh toán Online';
            default:
                return 'Phương thức thanh toán khác';
        }
    };

    const infoCards = [
        {
            icon: <CreditCardFilled className='text-2xl text-blue-500' />,
            label: 'Phương thức thanh toán',
            value: getPaymentMethodLabel(serviceInfo.paymentMethod),
            className: 'from-blue-50 to-indigo-50',
        },
        {
            icon: <PercentageOutlined className='text-2xl text-yellow-500' />,
            label: 'Phí vận chuyển',
            value: `${serviceInfo.shippingFee.toLocaleString()} VNĐ`,
            className: 'from-yellow-50 to-amber-50',
        },
    ];

    return (
        <Card
            className='mt-2 w-full overflow-hidden rounded-2xl border-gray-100 shadow-sm'
            title={
                <div className='flex items-center justify-between py-2'>
                    <h2 className='text-xl font-semibold text-gray-800'>Thông tin dịch vụ</h2>
                    <div className='flex items-center gap-2'>
                        {serviceInfo.isPaid ? (
                            <>
                                <CheckCircleFilled className='text-lg text-green-500' />
                                <span className='font-medium text-green-600'>Đã thanh toán</span>
                            </>
                        ) : (
                            <>
                                <CloseCircleFilled className='text-lg text-red-500' />
                                <span className='font-medium text-red-600'>Chưa thanh toán</span>
                            </>
                        )}
                    </div>
                </div>
            }
        >
            <Space direction='vertical' className='w-full' size='large'>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    {infoCards.map((info, index) => (
                        <div
                            key={index}
                            className={`rounded-xl bg-gradient-to-r p-4 ${info.className} border border-gray-100`}
                        >
                            <div className='flex items-start gap-3'>
                                <div className='rounded-lg bg-white p-2 shadow-sm'>{info.icon}</div>
                                <div className='flex-1'>
                                    <p className='mb-1 text-sm text-gray-600'>{info.label}</p>
                                    <p className='text-lg font-semibold text-gray-800'>{info.value}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='mt-4'>
                    <h3 className='mb-3 text-lg font-medium text-gray-700'>Ghi chú đơn hàng</h3>
                    <Input.TextArea
                        className='rounded-xl border-gray-200 bg-gray-50'
                        rows={3}
                        readOnly
                        value={description || 'Không có ghi chú nào cho đơn hàng này'}
                        style={{
                            resize: 'none',
                            fontSize: '0.95rem',
                            color: description ? '#374151' : '#6B7280',
                        }}
                    />
                </div>
            </Space>
        </Card>
    );
};

export default ServiceInfo;

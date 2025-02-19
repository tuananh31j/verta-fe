import { DescriptionsProps, Space } from 'antd';
import { IOrder } from '~/interfaces/order';

interface Props {
    receiverInfo: IOrder['customerInfo'];
    shippingAddress: {
        country: string;
        province: string;
        district: string;
        address: string;
    };
    description: string;
}

export default function ReceiverInfor({ receiverInfo, shippingAddress, description }: Props) {
    const receiverItems: DescriptionsProps['items'] = [
        {
            key: 'name',
            label: <span className='font-semibold capitalize'>Tên Người Nhận:</span>,
            children: <p className='capitalize'>{receiverInfo?.name}</p>,
        },
        {
            key: 'phone',
            label: <span className='font-semibold capitalize'>Số Điện Thoại:</span>,
            children: <p className='capitalize'>{receiverInfo?.phone}</p>,
        },
        {
            key: 'email',
            label: <span className='font-semibold capitalize'>Email:</span>,
            children: <p className='capitalize'>{receiverInfo?.email}</p>,
        },
    ];

    const shippingAddressItems: DescriptionsProps['items'] = [
        {
            key: 'address',
            label: <span className='font-semibold capitalize'>Địa chỉ nhận hàng:</span>,
            children: (
                <p>
                    [{shippingAddress?.address}] - {shippingAddress?.district} -{shippingAddress?.province} -{' '}
                    {shippingAddress?.country}
                </p>
            ),
        },
        {
            key: 'description',
            label: <span className='font-semibold capitalize'>Ghi chú đơn hàng:</span>,
            children: <p className='capitalize'>{description}</p>,
        },
    ];

    return (
        <Space className='mt-2 w-full rounded-lg bg-[#fff] p-4' direction='vertical'>
            <h3 className='text-lg font-medium text-black'>Thông tin người nhận</h3>
            <div className='grid grid-cols-3'>
                {receiverItems.map((item, index) => (
                    <div key={index} className='flex gap-2'>
                        {item.label}
                        {item.children}
                    </div>
                ))}
            </div>
            <div className='grid grid-cols-2'>
                {shippingAddressItems.map((item, index) => (
                    <div className='flex gap-2' key={index}>
                        {item.label}
                        {item.children}
                    </div>
                ))}
            </div>
        </Space>
    );
}

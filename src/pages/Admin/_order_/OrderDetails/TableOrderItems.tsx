import { Table, Tag } from 'antd';
import { TableProps } from 'antd/lib';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { TruckFilled, DollarCircleFilled } from '@ant-design/icons';

interface OrderItem {
    productId: string;
    variantId: string;
    name: string;
    size: string;
    color: string;
    category: string;
    quantity: number;
    price: number;
    image: string;
    isReviewed: boolean;
    isReviewDisabled: boolean;
}

interface Props {
    serviceInfo: {
        shippingFee: number;
        totalPrice: number;
    };
    orderItems: OrderItem[];
}

const TableOrderItems: React.FC<Props> = ({ serviceInfo, orderItems }) => {
    const navigate = useNavigate();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-vn', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    const infoCards = [
        {
            icon: <TruckFilled className='text-2xl text-green-500' />,
            label: 'Cước phí vận chuyển',
            value: formatCurrency(serviceInfo.shippingFee),
            className: 'from-green-50 to-emerald-50',
        },
        {
            icon: <DollarCircleFilled className='text-2xl text-purple-500' />,
            label: 'Tổng tiền',
            value: formatCurrency(serviceInfo.totalPrice),
            className: 'from-purple-50 to-fuchsia-50',
        },
    ];

    const columns: TableProps<OrderItem>['columns'] = [
        {
            title: 'Sản phẩm',
            key: 'product',
            width: '50%',
            render: (_, record) => (
                <div
                    className='flex cursor-pointer items-center gap-19 py-3'
                    onClick={() => navigate(`/products/${record.productId}`)}
                >
                    <div className='group relative'>
                        <div className='overflow-hidden rounded-2xl'>
                            <img
                                src={record.image}
                                alt={record.name}
                                className='h-20 w-20 transform object-cover transition-all duration-500 group-hover:scale-110'
                            />
                        </div>
                        <div className='absolute bottom-2 left-2'>
                            <Tag color='blue-inverse' className='bg-opacity-90 rounded-full shadow-lg backdrop-blur-sm'>
                                {record.category}
                            </Tag>
                        </div>
                    </div>
                    <div className='flex flex-1 flex-col gap-3'>
                        <div>
                            <h3 className='mb-1 leading-tight font-semibold text-gray-800'>{record.name}</h3>
                            <p className='text-sm text-gray-500'>ID: {record.productId.slice(-8)}</p>
                        </div>
                        <div className='flex items-center gap-3'>
                            <Tag color='purple' className='flex items-center gap-1 rounded-full px-4 py-1 text-sm'>
                                Size: {record.size}
                            </Tag>
                            <Tag
                                color='orange'
                                className='flex items-center gap-1 rounded-full px-4 py-1 text-sm'
                                style={{ backgroundColor: record.color }}
                            >
                                {record.color}
                            </Tag>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Đơn giá',
            key: 'unitPrice',
            width: '15%',
            align: 'center',
            render: (_, record) => (
                <div className='flex flex-col items-center gap-2'>
                    <div className='rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 shadow-sm'>
                        <span className='font-medium text-gray-700'>{formatCurrency(record.price)}</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Số lượng',
            key: 'quantity',
            width: '15%',
            align: 'center',
            render: (_, record) => (
                <div className='flex flex-col items-center gap-2'>
                    <div className='rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 shadow-sm'>
                        <span className='flex items-center gap-2 font-medium text-gray-700'>
                            <span className=''>{record.quantity}</span>
                        </span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Thành tiền',
            key: 'total',
            width: '20%',
            align: 'center',
            render: (_, record) => (
                <div className='flex flex-col items-center gap-2'>
                    <div className='rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 shadow-sm'>
                        <span className='font-medium text-gray-700'>
                            {formatCurrency(record.price * record.quantity)}
                        </span>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className='my-8 overflow-hidden bg-white'>
            <Table
                columns={columns}
                dataSource={orderItems}
                pagination={false}
                rowKey='productId'
                className='modern-table'
            />
            <div className='grid grid-cols-1 gap-4 px-4 py-3 md:grid-cols-2'>
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
        </div>
    );
};

export default TableOrderItems;

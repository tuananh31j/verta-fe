import { Table, Tag } from 'antd';
import { TableProps } from 'antd/lib';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { DollarCircleFilled } from '@ant-design/icons';
import { OrderItem } from '~/interfaces/order';

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

    const totalItems = orderItems.reduce((acc, item) => acc + item.quantity, 0);

    const columns: TableProps<OrderItem>['columns'] = [
        {
            title: 'Sản phẩm',
            key: 'product',
            width: '50%',
            render: (_, record) => (
                <div
                    className='flex cursor-pointer items-center gap-4 py-3'
                    onClick={() => navigate(`/products/${record.productId}`)}
                >
                    <div className='group relative'>
                        <div className='overflow-hidden rounded-lg shadow-sm'>
                            <img
                                src={record.image}
                                alt={record.name}
                                className='h-20 w-20 transform object-cover transition-all duration-300 group-hover:scale-110'
                            />
                        </div>
                        <div className='absolute bottom-2 left-2'>
                            <Tag color='blue' className='rounded-full text-xs font-medium shadow-sm'>
                                {record.category}
                            </Tag>
                        </div>
                    </div>
                    <div className='flex flex-1 flex-col gap-2'>
                        <div>
                            <h3 className='mb-1 font-medium text-gray-800 transition-colors hover:text-blue-600'>
                                {record.name}
                            </h3>
                            <p className='text-xs text-gray-500'>ID: {record.productId.slice(-8)}</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Tag color='purple' className='rounded-full px-3 py-0.5 text-xs'>
                                Size: {record.size}
                            </Tag>
                            <div
                                className='flex items-center rounded-full px-3 py-0.5 text-xs text-white shadow-sm'
                                style={{ backgroundColor: record.color }}
                            >
                                {record.color}
                            </div>
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
            render: (_, record) => <div className='font-medium text-gray-700'>{formatCurrency(record.price)}</div>,
        },
        {
            title: 'Số lượng',
            key: 'quantity',
            width: '15%',
            align: 'center',
            render: (_, record) => (
                <div className='inline-block rounded-lg bg-gray-50 px-4 py-2'>
                    <span className='font-medium text-gray-700'>{record.quantity}</span>
                </div>
            ),
        },
        {
            title: 'Thành tiền',
            key: 'total',
            width: '20%',
            align: 'center',
            render: (_, record) => (
                <div className='font-semibold text-blue-600'>{formatCurrency(record.price * record.quantity)}</div>
            ),
        },
    ];

    return (
        <div className='mb-5 rounded-xl border border-gray-200 bg-white shadow-sm'>
            <div className='border-b border-gray-100 px-6 py-4'>
                <h2 className='text-lg font-semibold text-gray-800'>Chi tiết đơn hàng</h2>
                <p className='text-sm text-gray-500'>{totalItems} sản phẩm</p>
            </div>
            <Table
                columns={columns}
                dataSource={orderItems}
                pagination={false}
                rowKey='productId'
                className='modern-table'
            />
            <div className='rounded-b-xl border-t border-gray-100 bg-gray-50 px-6 py-4'>
                <div className='flex items-center justify-between'>
                    <div>
                        <span className='font-medium text-gray-700'>Tổng cộng:</span>
                    </div>
                    <div className='flex items-center gap-3'>
                        <DollarCircleFilled className='text-xl text-blue-500' />
                        <span className='text-xl font-bold text-blue-600'>
                            {formatCurrency(serviceInfo.totalPrice)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableOrderItems;

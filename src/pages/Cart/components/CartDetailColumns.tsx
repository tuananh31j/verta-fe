import { TableProps } from 'antd';
import { formatCurrency } from '~/utils/formatCurrrency';
import CartDetailQuantityItem from './CartDetailQuantityItem';
import RemoveCartItem from './DeleteCartItem';
import ThumbnailImage from './ThumbnailImage';

export interface CartTableType {
    thumbnail: string;
    name: string;
    price: number;
    productId: string;
    quantity: number;
    stock: number;
    color: string;
    size: string;
    variantId: string;
}

export const columns: TableProps<CartTableType>['columns'] = [
    {
        title: '',
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        render: (_, record) => <ThumbnailImage productId={record.productId} thumbnail={record.thumbnail} />,
    },
    {
        title: 'Sản phẩm',
        dataIndex: 'product',
        key: 'product',
        render: (_, record) => {
            return (
                <div className='flex'>
                    <div>
                        <span className='block text-base font-medium'>{record.name}</span>
                        <div className='my-1 flex items-center gap-4'>
                            <span className='text-sm'>
                                Kích cỡ: <span className='font-medium'>{record.size}</span>
                            </span>
                            <button
                                style={{ backgroundColor: `${record.color}` }}
                                className={`relative overflow-hidden rounded-full border px-2 py-2 text-sm transition-all`}
                            ></button>
                        </div>
                        <span className='mt-1 block text-base font-medium'>{formatCurrency(record.price)}</span>
                    </div>
                </div>
            );
        },
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (_, record) => (
            <CartDetailQuantityItem
                productId={record.productId}
                quantityValue={record.quantity}
                stock={record.stock}
                variantId={record.variantId}
            />
        ),
    },
    {
        title: 'Đơn giá',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (_, record) => <span className='font-medium'>{formatCurrency(record.price)}</span>,
    },
    {
        title: 'Tổng',
        dataIndex: 'subTotal',
        key: 'subTotal',
        render(_, record) {
            return <span className='font-medium'>{formatCurrency(record.price * record.quantity)}</span>;
        },
    },

    {
        title: '',
        key: 'action',
        width: '50px',
        render: (_, record) => <RemoveCartItem variantId={record.variantId} />,
    },
];

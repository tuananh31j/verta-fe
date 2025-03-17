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
    variant: ICartItem['variant'];
}

export const columns: TableProps<CartTableType>['columns'] = [
    {
        title: '',
        dataIndex: 'thumbnail',
        key: 'thumbnail',
        render: (_, record) => (
            <ThumbnailImage stock={record.stock} productId={record.productId} thumbnail={record.variant.image} />
        ),
    },
    {
        title: 'Sản phẩm',
        dataIndex: 'product',
        key: 'product',
        render: (_, record) => {
            return (
                <div className={`flex ${record.stock === 0 ? 'opacity-70' : 'opacity-100'}`}>
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
                variantId={record.variant._id}
            />
        ),
    },
    {
        title: 'Đơn giá',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (_, record) =>
            record.stock === 0 ? (
                <span className='text-red-500'>{formatCurrency(0)}</span>
            ) : (
                <span className='font-medium'>{formatCurrency(record.price)}</span>
            ),
    },
    {
        title: 'Tổng',
        dataIndex: 'subTotal',
        key: 'subTotal',
        render: (_, record) =>
            record.stock === 0 ? (
                <span className='text-red-500'>{formatCurrency(0)}</span>
            ) : (
                <span className='font-medium'>{formatCurrency(record.price * record.quantity)}</span>
            ),
    },

    {
        title: '',
        key: 'action',
        width: '50px',
        render: (_, record) => <RemoveCartItem variantId={record.variant._id} />,
    },
];

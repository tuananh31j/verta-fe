import { Image, TableProps } from 'antd';
import CartDetailQuantityItem from './CartDetailQuantityItem';
import RemoveCartItem from './DeleteCartItem';
import { formatCurrency } from '~/utils/formatCurrrency';

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
        render: (_, record, index) => {
            return (
                <div className='w-30 min-w-10 rounded-md p-2'>
                    <img src={record.thumbnail} alt={`cart thumbnail`} className='w-full object-contain' />
                </div>
            );
        },
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
        render: (_, record) => <RemoveCartItem productId={record.productId} />,
    },
];

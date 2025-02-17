import { Form, Input, Table } from 'antd';
// import useGetAllCart from '~/hooks/queries/cart/useGetAllCart';
import { CartTableType, columns } from './components/CartDetailColumns';
// import { formatCurrency } from '~/utils/formatCurrency';
import { Link } from 'react-router-dom';
import { formatCurrency } from '~/utils/formatCurrrency';
import TextArea from 'antd/es/input/TextArea';
import { ChangeEventHandler, useCallback } from 'react';
import _ from 'lodash';
import useGetAllCart from '~/hooks/queries/products/cart/useGetAllCart';

type FieldType = {
    description?: string;
};

const CartDetail = () => {
    const { data: cartList, isLoading } = useGetAllCart();
    const data = cartList?.items.map((item) => {
        return {
            productId: item._id,
            name: item.product.name as string,
            thumbnail: item.product.thumbnail as string,
            price: Number(item.product.price),
            quantity: item.quantity,
            stock: item.variant.stock,
            color: item.variant.color,
            size: item.variant.size,
        };
    });

    const onDescriptionChange = useCallback((value: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log('Hehe', value);
    }, []);

    return (
        <div className='m-auto mt-8 w-full max-w-7xl bg-white px-2'>
            <div className=''>
                <div className=''>
                    <div className='w-full'>
                        <Table<CartTableType>
                            rowKey='productId'
                            columns={columns}
                            loading={isLoading}
                            dataSource={data}
                            pagination={false}
                            scroll={{
                                x: 'max-content',
                            }}
                        />
                    </div>
                    <div className='rounded p-3'>
                        {/* <span className='text-xl font-medium'>Hóa đơn</span> */}
                        <div className='mt-5 grid grid-cols-[2fr_1fr] gap-8'>
                            <Form
                                name='basic'
                                autoComplete='off'
                                layout='vertical'
                                onValuesChange={onDescriptionChange}
                            >
                                <Form.Item<FieldType> label='Chú thích' name='description'>
                                    <TextArea rows={4} placeholder='Chú thích...' maxLength={255} />
                                </Form.Item>
                            </Form>

                            <div>
                                <div className='mr-8 flex justify-end'>
                                    <span className='block text-xl font-semibold'>
                                        <span className='text-sm font-medium'>Tổng tiền:</span>{' '}
                                        {cartList &&
                                            cartList.items.length > 0 &&
                                            formatCurrency(
                                                cartList?.items.reduce((acc, curr) => {
                                                    return acc + curr.product.price * curr.quantity;
                                                }, 0)
                                            )}
                                    </span>
                                </div>
                                {/* {cartList && cartList.items.length > 0 && ( */}
                                <div className='flex items-center justify-center gap-4'>
                                    <div className='mt-5 cursor-pointer rounded-full border-[1px] border-black bg-black px-6 py-2 font-bold text-white duration-300 hover:bg-black/80'>
                                        Xóa tất cả
                                    </div>
                                    <Link
                                        to='/checkout'
                                        className='mt-5 cursor-pointer rounded-full border-[1px] border-black bg-black px-8 py-2 font-bold text-white duration-300 hover:bg-black/80'
                                    >
                                        Thanh toán
                                    </Link>
                                </div>
                                {/* )} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDetail;

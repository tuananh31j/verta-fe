import { Form, Input, Table } from 'antd';
// import useGetAllCart from '~/hooks/queries/cart/useGetAllCart';
import { CartTableType, columns } from './components/CartDetailColumns';
// import { formatCurrency } from '~/utils/formatCurrency';
import { Link } from 'react-router-dom';
import { formatCurrency } from '~/utils/formatCurrrency';
import TextArea from 'antd/es/input/TextArea';
import { ChangeEventHandler, useCallback } from 'react';
import _ from 'lodash';

type FieldType = {
    description?: string;
};

const CartDetail = () => {
    // const { data: cartList, isPending } = useGetAllCart();
    // const data = cartList?.items.map((item) => {
    //     return {
    //         productId: item.productId._id,
    //         name: item.productId.name as string,
    //         thumbnail: item.productId.thumbnail as string,
    //         price: item.productId.price,
    //         quantity: item.quantity,
    //         stock: item.productId.stock,
    //     };
    // });

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
                            dataSource={[]}
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
                                        {formatCurrency(1699000)}
                                        {/* {cartList &&
                                        cartList.items.length > 0 &&
                                        formatCurrency(
                                            cartList?.items.reduce((acc, curr) => {
                                                return acc + curr.productId.price * curr.quantity;
                                            }, 0)
                                        )} */}
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

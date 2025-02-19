import { Form, Table } from 'antd';
// import useGetAllCart from '~/hooks/queries/cart/useGetAllCart';
import { CartTableType, columns } from './components/CartDetailColumns';
// import { formatCurrency } from '~/utils/formatCurrency';
import TextArea from 'antd/es/input/TextArea';
import useGetAllCart from '~/hooks/queries/cart/useGetAllCart';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToast } from '~/context/ToastProvider';
import { reset, setDescription } from '~/store/slice/checkoutSlice';
import { useTypedSelector } from '~/store/store';
import { closeCart } from '~/store/slice/cartSlice';
import { formatCurrency } from '~/utils/formatCurrrency';

type FieldType = {
    description?: string;
};

const CartDetail = () => {
    const { data: cartList, isLoading } = useGetAllCart();
    const isOpenCart = useTypedSelector((state) => state.cart.isOpen);
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = cartList?.items.map((item) => {
        return {
            productId: item.product._id,
            name: item.product.name as string,
            thumbnail: item.product.thumbnail as string,
            price: Number(item.product.price),
            quantity: item.quantity,
            stock: item.variant.stock,
            color: item.variant.color.hex,
            size: item.variant.size.value,
            variantId: item.variant._id,
        };
    });
    const navigateCheckout = () => {
        const hasOutOfStock = data?.some((item) => item.stock === 0);
        if (hasOutOfStock) {
            toast('info', 'Có sản phẩm đã hết hàng trong giỏ, vui lòng kiểm tra lại!');
            return;
        }
        if (isOpenCart) {
            dispatch(closeCart());
        }
        navigate('/checkout');
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onDescriptionChange = useCallback((value: any) => {
        dispatch(setDescription(value.description));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        dispatch(reset());
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                            size='small'
                            scroll={{
                                x: 'max-content',
                            }}
                        />
                    </div>
                    <div className='rounded p-3'>
                        {/* <span className='text-xl font-medium'>Hóa đơn</span> */}
                        <div className='mt-5 grid grid-cols-2 gap-8'>
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
                                <div className='mr-10 flex justify-end'>
                                    <span className='block text-xl font-semibold'>
                                        <span className='text-sm font-medium'>Tổng:</span>{' '}
                                        {cartList &&
                                            cartList.items.length > 0 &&
                                            formatCurrency(
                                                cartList?.items.reduce((acc, curr) => {
                                                    return acc + curr.product.price * curr.quantity;
                                                }, 0)
                                            )}
                                    </span>
                                </div>
                                {cartList && cartList.items.length > 0 && (
                                    <div className='flex items-center justify-center gap-4'>
                                        {/* <div className='mt-5 cursor-pointer rounded-full border-[1px] border-black bg-black px-6 py-2 font-bold text-white duration-300 hover:bg-black/80'>
                                        Xóa tất cả
                                    </div> */}
                                        <p
                                            onClick={navigateCheckout}
                                            className='mt-5 cursor-pointer rounded-full border-[1px] border-black bg-black px-8 py-2 font-bold text-white duration-300 hover:bg-black/80'
                                        >
                                            Thanh toán
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDetail;

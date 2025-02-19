import { CloseOutlined } from '@ant-design/icons';
import { Empty, Popconfirm, Spin, Typography } from 'antd';
import { Link } from 'react-router-dom';
import useRemoveCartItem from '~/hooks/mutations/cart/useRemoveCartItem';
import useGetAllCart from '~/hooks/queries/cart/useGetAllCart';
import { formatCurrency } from '~/utils/formatCurrrency';

const HeaderCart = () => {
    const { data: cartList, isLoading } = useGetAllCart();
    const { mutate } = useRemoveCartItem();
    const removeCartItem = (id: string) => {
        mutate(id);
    };

    return (
        <>
            <div className='relative'>
                {isLoading && (
                    <div className='flex w-60 items-center justify-center'>
                        <Spin size='small' />
                    </div>
                )}
                <div
                    className={`${(cartList && cartList.items?.length === 0) || isLoading ? 'h-40' : 'h-96 pb-48'} overflow-y-auto`}
                >
                    {!isLoading && cartList && cartList.items?.length === 0 && (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            className='w-60'
                            description={<Typography.Text className='text-secondary'>Giỏ hàng trống</Typography.Text>}
                        />
                    )}

                    {!isLoading &&
                        cartList &&
                        cartList.items?.length > 0 &&
                        cartList.items.map((item) => (
                            <div
                                key={`${item.variant._id}${item.quantity}`}
                                className='mb-3 flex justify-between gap-5 px-4 py-2'
                            >
                                <Link to={`/product/${item.product._id}`} className='w-16 object-cover'>
                                    <img src={item.variant.image} alt='ảnh sản phảm' className='w-full' />
                                </Link>
                                <div>
                                    <div className='flex items-center justify-between gap-8'>
                                        <span className='text-secondary uppercase'>{item.product.name}</span>
                                        <Popconfirm
                                            title='Xóa sản phẩm'
                                            placement='topLeft'
                                            description='Bạn có muốn xóa sản phẩm này khỏi giỏ hàng không?'
                                            onConfirm={() => removeCartItem(item.variant._id)}
                                            okText='Đồng ý'
                                            cancelText='Hủy'
                                        >
                                            <CloseOutlined className='cursor-pointer p-2' />
                                        </Popconfirm>
                                    </div>
                                    <div className='text-secondary flex items-center gap-3'>
                                        <span>
                                            Kích cỡ:{' '}
                                            <span className='text-secondary text-base font-medium'>
                                                {item.variant.size.value}
                                            </span>
                                        </span>{' '}
                                        <button
                                            style={{ backgroundColor: `${item.variant.color.hex}` }}
                                            className={`relative overflow-hidden rounded-full border px-2 py-2 text-sm transition-all`}
                                        ></button>
                                    </div>
                                    <div className='text-secondary mt-1'>
                                        {item.variant.stock === 0 ? (
                                            <span className='text-sm text-red-500'>Hết hàng</span>
                                        ) : (
                                            <span>
                                                Số lượng:{' '}
                                                <span className='text-secondary text-base'>{item.quantity}</span>
                                            </span>
                                        )}
                                    </div>
                                    <div className='text-primary flex justify-end text-base font-semibold'>
                                        {formatCurrency(item.product.price)}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                {cartList && cartList.items?.length > 0 && (
                    <div className='absolute right-0 bottom-0 left-0 border-t border-gray-100 bg-white p-4'>
                        <div className='mb-3 flex justify-between'>
                            <span className='font-semibold'>Tổng:</span>
                            <span className='font-semibold'>
                                {cartList.items?.reduce((acc, curr) => acc + curr.quantity, 0)}
                            </span>
                        </div>
                        <div className='mb-2 flex justify-between'>
                            <span className='font-semibold'>Thành tiền:</span>
                            <span className='font-semibold'>
                                {formatCurrency(
                                    cartList.items?.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0)
                                )}
                            </span>
                        </div>
                        <Link to='/cart/detail' className='mt-3 block'>
                            <div className='border border-black bg-white py-2 text-center font-medium text-black duration-300 hover:bg-white/80'>
                                Xem giỏ hàng
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default HeaderCart;

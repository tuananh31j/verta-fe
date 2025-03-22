import { useEffect, useRef } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useToast } from '~/context/ToastProvider';
import useGetAllCart from '~/hooks/queries/cart/useGetAllCart';
import { ProductItem } from '~/interfaces/order';
import { setPrice, setProductsItems } from '~/store/slice/checkoutSlice';
import { useAppDispatch, useTypedSelector } from '~/store/store';
import { formatCurrency } from '~/utils/formatCurrrency';

export default function CheckoutLayout() {
    const { data: cartList } = useGetAllCart();
    const dispatch = useAppDispatch();
    const feeShipping = useTypedSelector((state) => state.checkOut.shippingFee);
    const voucher = useTypedSelector((state) => state.checkOut.voucher);
    const toast = useToast();
    const isRunned = useRef(false);

    const data = cartList?.items.map((item, index) => ({
        id: index.toString(),
        productId: item.product._id,
        variantId: item.variant._id,
        name: item.product.name as string,
        size: item.variant.size.value,
        color: item.variant.color.hex,
        image: item.product.thumbnail as string,
        price: Number(item.product.price),
        category: 'Sports',
        quantity: item.quantity,
        stock: item.variant.stock,
    }));
    const totalPrice = cartList
        ? cartList?.items?.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0)
        : 0;
    const calTotalPrice = feeShipping ? totalPrice + feeShipping : totalPrice;
    const discount =
        voucher?.discountType === 'percentage'
            ? Math.min(
                  totalPrice * ((voucher?.voucherDiscount ?? 0) / 100),
                  voucher?.maxDiscountAmount ?? Infinity // Giới hạn tối đa
              )
            : (voucher?.voucherDiscount ?? 0);

    const calTotalPriceWithVoucher = totalPrice + feeShipping - discount;

    useEffect(() => {
        dispatch(setPrice(calTotalPrice));
    }, [calTotalPrice, dispatch]);
    useEffect(() => {
        if (data) {
            dispatch(setProductsItems(data as ProductItem[]));
        }
    }, [data, dispatch]);
    // PROTECTED LAYOUT
    const hasOutOfStock = data?.some((item) => item.stock === 0);

    if (cartList?.items.length === 0) {
        if (!isRunned.current) {
            toast('info', 'Không có sản phẩm nào trong giỏ hàng của bạn để thanh toán!');
            isRunned.current = true;
        }
        return <Navigate to={'/'} />;
    }

    if (hasOutOfStock) {
        if (!isRunned.current) {
            toast('info', 'Có sản phẩm trong giỏ hàng hiện đang hết hàng vui lòng kiểm tra lại!');
            isRunned.current = true;
        }
        return <Navigate to={'/cart/detail'} />;
    }

    isRunned.current = false;

    return (
        <main className='mx-6 max-w-7xl px-24 xl:mx-auto'>
            <div className='grid grid-cols-[60%_50%]'>
                <div className='py-11'>
                    <Link to={'/'} className='text-4xl font-semibold'>
                        VERTA
                    </Link>
                    <div className='mt-8'>
                        <Outlet />
                    </div>
                </div>
                <div className='min-h-[100vh] border-l-[1px] border-gray-300 px-11 py-11'>
                    {cartList && (
                        <>
                            <div className='flex flex-col gap-5'>
                                {cartList.items.map((item, index) => (
                                    <div
                                        key={`${item.variant._id}${item.quantity}`}
                                        className='mb-3 flex items-center justify-between'
                                    >
                                        <div className='flex items-center gap-5'>
                                            <div className='relative w-16 rounded-md border border-[#717171] object-cover px-2'>
                                                <img src={item.variant.image} alt='ảnh sản phẩm' className='w-full' />
                                                <span className='absolute -top-3 -right-3 rounded-full bg-[#999999] px-2 text-white'>
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div>
                                                <h3 className='text-sm text-[#4b4b4b] uppercase'>
                                                    {item.product.name}
                                                </h3>
                                                <p className='mt-2 text-xs text-[#969696]'>
                                                    Size {item.variant.size.value}/ {item.variant.color.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='text-[14px] font-normal text-[#4b4b4b]'>
                                                {formatCurrency(item.product.price)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='mt-2 border-t border-b border-gray-300 py-4'>
                                <div className='flex justify-between'>
                                    <span className='text-sm text-[#717171]'>Tạm tính:</span>
                                    <span className='text-[#4b4b4b]'>
                                        {formatCurrency(
                                            cartList.items?.reduce(
                                                (acc, curr) => acc + curr.product.price * curr.quantity,
                                                0
                                            )
                                        )}
                                    </span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-sm text-[#717171]'>Phí giao hàng:</span>
                                    <span className='text-[#4b4b4b]'>
                                        {feeShipping && '+ '}
                                        {formatCurrency(feeShipping)}
                                    </span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-sm text-[#717171]'>Mã giảm giá:</span>
                                    <span className='text-[#4b4b4b]'>
                                        {voucher && '- '}
                                        {formatCurrency(discount)}
                                    </span>
                                </div>
                            </div>
                            <div className='flex justify-between py-4'>
                                <span className='text-base text-[#4b4b4b]'>Tổng tiền:</span>
                                <span className='flex items-center gap-2 text-2xl font-semibold text-[#4b4b4b]'>
                                    <span className='text-sm font-thin text-[#969696]'>VND</span>
                                    {formatCurrency(calTotalPriceWithVoucher)}
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}

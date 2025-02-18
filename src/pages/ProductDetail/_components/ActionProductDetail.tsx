import { Button, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import soldOut from '~/assets/soldout.webp';
import { useToast } from '~/context/ToastProvider';
import useAddCart from '~/hooks/mutations/cart/useAddCart';
import { ISizeInColor, IVariantDetail } from '~/interfaces/product';
import { useTypedSelector } from '~/store/store';
import SelectSizeModal from './SelectSizeModal';

type IProps = {
    variants: IVariantDetail[];
    setColorVariant: (e: IVariantDetail) => void;
    selectedColor: IVariantDetail;
    setSizeSelect: (e: ISizeInColor | null) => void;
    selectedSize: ISizeInColor;
};
export default function ActionProductDetail({
    variants,
    selectedColor,
    selectedSize,
    setSizeSelect,
    setColorVariant,
}: IProps) {
    const { id } = useParams();
    const [quantity, setQuantity] = useState<number>(1);
    const { mutate: addToCart, isPending } = useAddCart();
    const user = useTypedSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const toast = useToast();
    const [outOfStock, setOutOfStock] = useState(false);
    const handleAddToCart = () => {
        if (!user) {
            toast('info', 'Bạn cần phải đăng nhập trước');
            navigate('/auth');
        }
        if (selectedSize.stock === 0) {
            toast('info', 'Sản phẩm đã hết hàng');
        }
        if (!isPending && id) {
            addToCart({ productId: id, quantity, variantId: selectedSize._id });
        }
    };

    useEffect(() => {
        // Tìm màu đầu tiên có stock > 0
        const firstAvailableColor = variants.find((variant) => variant.items.some((item) => item.stock > 0));
        if (firstAvailableColor) {
            if (outOfStock) {
                setOutOfStock(false);
            }
            setColorVariant(firstAvailableColor);
        }
        if (!firstAvailableColor) {
            setOutOfStock(true);
        }
    }, [setColorVariant, variants]);

    useEffect(() => {
        if (!selectedColor) return;
        const availableSize = selectedColor.items.find((item) => item.stock > 0);
        if (availableSize) {
            setSizeSelect(availableSize);
        }
    }, [selectedColor, setSizeSelect]);

    return (
        <>
            {outOfStock ? (
                <p className='my-8 font-semibold text-red-500'>Sản phẩm đã hết hàng</p>
            ) : (
                <>
                    <div>
                        <p className='text-sm font-semibold'>Màu sắc</p>
                        <div className='mt-2 flex items-center gap-2'>
                            {variants.map((item, index) => {
                                const totalStock = item.items.reduce((acc, curr) => acc + curr.stock, 0);
                                return (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            if (totalStock > 0) {
                                                setColorVariant(item);
                                            }
                                        }}
                                        disabled={totalStock === 0}
                                        style={{ backgroundColor: `${item.color.hex}` }}
                                        className={`relative cursor-pointer overflow-hidden rounded-full border px-4 py-4 text-sm transition-all ${selectedColor === item ? `border-black` : 'border-[#8f8f8f]'} ${totalStock === 0 ? 'cursor-not-allowed opacity-50' : ''} `}
                                    >
                                        {totalStock === 0 && (
                                            <img
                                                src={soldOut}
                                                className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'
                                                alt=''
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className='mt-2'>
                        <p className='text-sm font-semibold'>Kích thước</p>
                        <div className='mt-2 flex items-center gap-2'>
                            {selectedColor?.items.map((item, index) => (
                                <button
                                    key={index}
                                    disabled={item.stock === 0}
                                    onClick={() => setSizeSelect(item)}
                                    className={`relative cursor-pointer border-2 px-3 py-1 text-sm transition-all ${
                                        selectedSize === item
                                            ? 'border-black bg-black text-white'
                                            : 'border-[#8f8f8f] bg-white text-black'
                                    }`}
                                >
                                    <span className={`${item.stock === 0 && 'text-[#8f8f8f]'}`}>
                                        Size {item.size.value}
                                    </span>
                                    {item.stock === 0 && (
                                        <div className='absolute top-[50%] left-[50%] h-[0.5px] w-full translate-x-[-50%] translate-y-[-50%] rotate-30 bg-[#8f8f8f]' />
                                    )}
                                    {selectedSize === item && (
                                        <span className='absolute right-0 bottom-0 text-xs'>✔</span>
                                    )}
                                </button>
                            ))}
                        </div>
                        {selectedSize && (
                            <p className='mt-2 text-xs text-[#8f8f8f]'>Còn lại {selectedSize.stock} sản phẩm</p>
                        )}
                    </div>
                </>
            )}
            <div className='mt-4 inline-block'>
                <SelectSizeModal>
                    <span className='cursor-pointer uppercase underline'>Hướng dẫn chọn size</span>
                </SelectSizeModal>
            </div>
            <div className='mt-4 flex items-center gap-5'>
                <span className='text-sm font-semibold'>Số lượng</span>
                <div className='antd-custom my-2 flex items-center gap-2'>
                    <Button
                        className='h-full'
                        disabled={quantity === 1}
                        onClick={() => {
                            if (quantity > 1) {
                                setQuantity(quantity - 1);
                            }
                        }}
                    >
                        -
                    </Button>
                    <InputNumber
                        min={1}
                        defaultValue={1}
                        max={selectedSize?.stock}
                        value={quantity}
                        onChange={(e) => {
                            if ((e as number) > 0) {
                                setQuantity(e as number);
                            }
                        }}
                        className='flex items-center'
                        controls={false}
                        disabled={outOfStock}
                    />
                    <Button
                        onClick={() => {
                            if (quantity < selectedSize?.stock) {
                                setQuantity(quantity + 1);
                            }
                        }}
                        className=''
                        disabled={selectedSize ? quantity === selectedSize.stock : true}
                    >
                        +
                    </Button>
                </div>
            </div>
            <div className='mt-4 flex'>
                {outOfStock ? (
                    <button className='w-full cursor-not-allowed border-2 border-black bg-white py-2 font-semibold'>
                        Thêm vào giỏ hàng
                    </button>
                ) : (
                    <button
                        onClick={handleAddToCart}
                        className='w-full cursor-pointer border-2 border-black bg-white py-2 font-semibold text-black duration-300 hover:bg-black hover:text-white'
                    >
                        Thêm vào giỏ hàng
                    </button>
                )}
            </div>
        </>
    );
}

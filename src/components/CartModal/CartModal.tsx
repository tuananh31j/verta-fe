import { Modal } from 'antd';
import { useDispatch } from 'react-redux';
import backToBuying from '~/assets/icons/backToBuying.svg';
import CartDetail from '~/pages/Cart/CartDetail';
import { closeCart } from '~/store/slice/cartSlice';
import { useTypedSelector } from '~/store/store';
const CartModal = () => {
    const isOpen = useTypedSelector((state) => state.cart.isOpen);
    const cartQuantity = useTypedSelector((state) => state.cart.quantityInCart);
    const dispatch = useDispatch();
    return (
        <>
            <Modal
                open={isOpen}
                width={'70vw'}
                footer={<></>}
                centered
                onCancel={() => dispatch(closeCart())}
                title={`Giỏ hàng của bạn (Đang có ${cartQuantity} sản phẩm)`}
            >
                <CartDetail />
                <div className='flex items-center gap-1' onClick={() => dispatch(closeCart())}>
                    <img src={backToBuying} alt='tiep tuc mua hang' className='w-4' />
                    <span>Tiếp tục mua hàng</span>
                </div>
            </Modal>
        </>
    );
};

export default CartModal;

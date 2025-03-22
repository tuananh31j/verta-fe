import { CloseOutlined, RightOutlined } from '@ant-design/icons';
import { Popconfirm, Radio } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import codImg from '~/assets/cash.jpg';
import payosImg from '~/assets/payos.svg';
import { useGetAllAddress } from '~/hooks/queries/address/useGetAllAddress';
import { removeVoucher, setShippingFee } from '~/store/slice/checkoutSlice';
import { useTypedSelector } from '~/store/store';
import { formatCurrency } from '~/utils/formatCurrrency';
import CardPaymentModal from './_components/CardPaymentModal';
import CashPaymentModal from './_components/CashPaymentModal';
import ConfirmNewAddressModal from './_components/ConfirmNewAddressModal';
import VoucherModal from './_components/VoucherModal';

export default function MethodPayment() {
    const [paymentMethod, setPaymentMethod] = useState<'COD' | 'PAYOS'>('COD');
    const [isOpen, setOpen] = useState(false);
    const [isOpenPayosModal, setOpenPayosModal] = useState(false);
    const [isAddressModal, setOpenAddressModal] = useState(false);
    const selectedVoucher = useTypedSelector((state) => state.checkOut.voucher);
    const { data } = useGetAllAddress();
    const onchangeRadioPayment = (type: 'COD' | 'PAYOS') => {
        setPaymentMethod(type);
    };
    const dispatch = useDispatch();
    const checkOutInfor = useTypedSelector((state) => state.checkOut);
    useEffect(() => {
        dispatch(setShippingFee(30000));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleClickCheckOut = () => {
        const isAddressExists = data?.some(
            (addr) =>
                addr.address === checkOutInfor.shippingAddress.address &&
                addr.province === checkOutInfor.shippingAddress.province &&
                addr.district === checkOutInfor.shippingAddress.district &&
                addr.ward === checkOutInfor.shippingAddress.ward &&
                addr.name === checkOutInfor.customerInfor.name &&
                addr.phone === checkOutInfor.customerInfor.phone
        );
        if (data?.length === 0 || !isAddressExists) {
            setOpenAddressModal(true);
        } else {
            if (paymentMethod === 'COD') {
                setOpen(true);
            } else {
                setOpenPayosModal(true);
            }
        }
    };
    const handleRemoveVoucher = () => {
        dispatch(removeVoucher());
    };
    return (
        <>
            <div>
                {/* BREADCRUMB */}
                <div className='flex items-center gap-2 text-xs'>
                    <Link className='text-[#338dbc] duration-300 hover:text-cyan-500' to={'/cart/detail'}>
                        Giỏ hàng
                    </Link>
                    &gt;
                    <Link className='text-[#338dbc] duration-300 hover:text-cyan-500' to={'/checkout/'}>
                        Thông tin vận chuyển
                    </Link>
                    &gt;
                    <span className='text-black'>Phương thức thanh toán</span>
                </div>
                <h3 className='my-4 text-lg font-semibold text-[#333333] uppercase'>Phương thức vận chuyển</h3>
                <div className='mt-2 mb-12 pr-24'>
                    <div className='flex cursor-pointer items-center justify-between rounded-md border border-gray-300 px-6 py-4'>
                        <div className='flex items-center gap-2'>
                            <Radio checked></Radio>
                            <span className='text-sm text-[#737373]'>Giao hàng tận nơi</span>
                        </div>
                        <span className='text-sm'>{formatCurrency(30000)}</span>
                    </div>
                </div>
                <h3 className='my-4 text-lg font-semibold text-[#333333] uppercase'>Phương thức thanh toán</h3>
                <div className='mt-2 pr-24'>
                    <Radio.Group className='w-full' value={paymentMethod}>
                        <div
                            onClick={() => onchangeRadioPayment('COD')}
                            className='flex cursor-pointer items-center gap-5 rounded-t-md border border-gray-300 px-6 py-4'
                        >
                            <Radio value={'COD'}></Radio>
                            <div className='flex items-center gap-2'>
                                <img src={codImg} className='w-16' alt='' />
                                <span className='text-sm text-[#737373]'>Thanh toán khi nhận hàng (COD)</span>
                            </div>
                        </div>
                        <div
                            onClick={() => onchangeRadioPayment('PAYOS')}
                            className='flex cursor-pointer items-center gap-5 rounded-b-md border-r border-b border-l border-gray-300 px-6 py-4'
                        >
                            <Radio value={'PAYOS'}></Radio>
                            <div className='flex items-center gap-2'>
                                <img src={payosImg} className='w-16' alt='' />
                                <span className='text-sm text-[#737373]'>Thanh toán online PAYOS</span>
                            </div>
                        </div>
                    </Radio.Group>
                    {selectedVoucher ? (
                        <div className='mt-4 flex cursor-pointer items-center justify-between gap-5 rounded-md border border-gray-300 px-6 py-2'>
                            <VoucherModal>
                                <div className='flex w-full items-center gap-5'>
                                    <img
                                        src='https://cdn-icons-png.flaticon.com/512/4649/4649082.png'
                                        className='w-8'
                                        alt=''
                                    />
                                    {selectedVoucher ? (
                                        <span className='text-sm text-red-500'>
                                            {selectedVoucher.discountType === 'percentage'
                                                ? `${selectedVoucher.name} Giảm tối đa ${formatCurrency(selectedVoucher.maxDiscountAmount)}`
                                                : selectedVoucher.name}
                                        </span>
                                    ) : (
                                        <span className='text-sm text-[#737373]'>Áp dụng mã giảm giá</span>
                                    )}
                                </div>
                            </VoucherModal>
                            <Popconfirm
                                placement='bottom'
                                title={'Bạn có chắc không muốn sử dụng Voucher này'}
                                description={'Giá trị đơn hàng sẽ bị thay đổi lại'}
                                okText='Chắc chắn'
                                onConfirm={handleRemoveVoucher}
                                cancelText='Không'
                            >
                                <CloseOutlined />
                            </Popconfirm>
                        </div>
                    ) : (
                        <VoucherModal>
                            <div className='mt-4 flex cursor-pointer items-center justify-between gap-5 rounded-md border border-gray-300 px-6 py-2'>
                                <div className='flex w-full items-center gap-5'>
                                    <img
                                        src='https://cdn-icons-png.flaticon.com/512/4649/4649082.png'
                                        className='w-8'
                                        alt=''
                                    />
                                    <span className='text-sm text-[#737373]'>Áp dụng mã giảm giá</span>
                                </div>
                                <RightOutlined />
                            </div>
                        </VoucherModal>
                    )}
                    <div className='mt-8 flex justify-between'>
                        <Link to={'/checkout'} className='text-sm text-[#1677ff] duration-300 hover:text-cyan-500'>
                            Quay trở về
                        </Link>
                        <button
                            onClick={handleClickCheckOut}
                            type='submit'
                            className='flex cursor-pointer items-center justify-center rounded-md bg-[#338dbc] px-4 py-4 text-xs font-medium text-white uppercase duration-300 hover:bg-cyan-500'
                        >
                            Phương thức thanh toán
                        </button>
                    </div>
                </div>
            </div>
            <ConfirmNewAddressModal
                address={data ? data : []}
                isOpen={isAddressModal}
                setOpenCod={setOpen}
                setOpenPayOs={setOpenPayosModal}
                setOpen={setOpenAddressModal}
                paymentMethod={paymentMethod}
            />
            <CashPaymentModal isOpen={isOpen} setOpen={setOpen} paymentMethod={paymentMethod} />
            <CardPaymentModal isOpen={isOpenPayosModal} setOpen={setOpenPayosModal} paymentMethod={paymentMethod} />
        </>
    );
}

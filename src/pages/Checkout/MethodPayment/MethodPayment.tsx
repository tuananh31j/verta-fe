import { Radio } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setShippingFee } from '~/store/slice/checkoutSlice';
import { formatCurrency } from '~/utils/formatCurrrency';
import codImg from '~/assets/cash.jpg';
import payosImg from '~/assets/payos.svg';
import CashPaymentModal from './_components/CashPaymentModal';

export default function MethodPayment() {
    const [paymentMethod, setPaymentMethod] = useState<'COD' | 'PAYOS'>('COD');
    const [isOpen, setOpen] = useState(false);
    const onchangeRadioPayment = (type: 'COD' | 'PAYOS') => {
        setPaymentMethod(type);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setShippingFee(30000));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleCheckOut = () => {
        setOpen(true);
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
                    <div className='mt-8 flex justify-between'>
                        <Link to={'/cart/detail'} className='text-sm text-[#1677ff] duration-300 hover:text-cyan-500'>
                            Giỏ hàng
                        </Link>
                        <button
                            onClick={handleCheckOut}
                            type='submit'
                            className='flex cursor-pointer items-center justify-center rounded-md bg-[#338dbc] px-4 py-4 text-xs font-medium text-white uppercase duration-300 hover:bg-cyan-500'
                        >
                            Phương thức thanh toán
                        </button>
                    </div>
                </div>
            </div>
            <CashPaymentModal isOpen={isOpen} setOpen={setOpen} paymentMethod={paymentMethod} />
        </>
    );
}

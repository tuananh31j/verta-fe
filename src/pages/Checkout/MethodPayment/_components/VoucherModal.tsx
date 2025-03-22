import { CheckOutlined } from '@ant-design/icons';
import { Modal, Spin } from 'antd';
import dayjs from 'dayjs';
import { ReactNode, useState } from 'react';
import { useDispatch } from 'react-redux';
import useGetProfile from '~/hooks/queries/profile/useGetProfile';
import { useGetVoucherNewUser } from '~/hooks/queries/vouchers/useGetVoucherForNewUser';
import { useGetVoucherUser } from '~/hooks/queries/vouchers/useGetVoucherForUser';
import { changeVoucher } from '~/store/slice/checkoutSlice';
import { useTypedSelector } from '~/store/store';
import { IVoucher } from '~/types/Voucher';
import { formatCurrency } from '~/utils/formatCurrrency';

export default function VoucherModal({ children }: { children: ReactNode }) {
    const [isOpen, setOpen] = useState(false);
    const { data: voucherData, isPending: voucherPending } = useGetVoucherUser();
    const { data: user } = useGetProfile();
    const { data: newVoucherData, isPending: newVoucherPending } = useGetVoucherNewUser(user?.userIsOldWhen);
    const dispatch = useDispatch();
    const selectedVoucher = useTypedSelector((state) => state.checkOut.voucher);
    const handleChangeVoucher = (item: IVoucher) => {
        dispatch(changeVoucher(item));
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const totalPrice = useTypedSelector((state) => state.checkOut.totalPrice - state.checkOut.shippingFee);
    return (
        <>
            <div onClick={() => setOpen(true)}>{children}</div>
            <Modal open={isOpen} width={1238} onCancel={handleCancel} footer={<></>} onClose={handleCancel} centered>
                <h3 className='text-xl font-bold'>Lựa chọn voucher</h3>
                {dayjs().isBefore(dayjs(user?.userIsOldWhen)) && (
                    <div className='mt-6'>
                        <h3 className='text-[#737373]'>
                            Mã giảm giá dành cho người mới{' '}
                            <span className='text-red-300'>
                                {' '}
                                ( Lưu ý: Tất cả voucher này sẽ không sử dụng được sau 7 ngày tính từ khi tạo tài khoản
                                hoặc đã đặt đơn hàng đầu tiên)
                            </span>
                        </h3>
                        {newVoucherPending ? (
                            <div className='flex w-full items-center justify-center py-8'>
                                <Spin />
                            </div>
                        ) : (
                            <div className='mt-4 grid grid-cols-3 justify-center gap-5'>
                                {newVoucherData &&
                                    newVoucherData
                                        .sort((a, b) => {
                                            const aEligible = totalPrice >= a.minimumOrderPrice ? 1 : 0;
                                            const bEligible = totalPrice >= b.minimumOrderPrice ? 1 : 0;
                                            const aRemainingUsage = a.usagePerUser - (a.usedCount || 0);
                                            const bRemainingUsage = b.usagePerUser - (b.usedCount || 0);
                                            const aIsExhausted = aRemainingUsage <= 0 ? 1 : 0;
                                            const bIsExhausted = bRemainingUsage <= 0 ? 1 : 0;
                                            return (
                                                aIsExhausted - bIsExhausted ||
                                                bEligible - aEligible ||
                                                bRemainingUsage - aRemainingUsage
                                            );
                                        })
                                        .map((item, index) => (
                                            <div
                                                onClick={() => {
                                                    if (totalPrice >= item.minimumOrderPrice) {
                                                        handleChangeVoucher(item);
                                                    }
                                                }}
                                                key={index}
                                                className={`relative flex w-full overflow-hidden ${
                                                    totalPrice < item.minimumOrderPrice
                                                        ? 'cursor-not-allowed border-[#737373]'
                                                        : 'cursor-pointer border-black'
                                                } items-center gap-5 rounded-md border bg-gray-50 px-4 py-4`}
                                            >
                                                {selectedVoucher === item && (
                                                    <div className='absolute top-0 right-0 rounded-bl-sm bg-green-500 px-2 py-1'>
                                                        <CheckOutlined />
                                                    </div>
                                                )}
                                                <div className='flex flex-col items-center select-none'>
                                                    <img
                                                        src='https://cdn-icons-png.flaticon.com/512/4649/4649082.png'
                                                        className={`${totalPrice < item.minimumOrderPrice && 'opacity-50'} w-8`}
                                                        alt=''
                                                    />
                                                    <span
                                                        className={`${
                                                            totalPrice < item.minimumOrderPrice
                                                                ? 'rounded-md bg-black/45 px-1.5 text-white'
                                                                : 'rounded-md bg-red-500 px-1.5 text-white'
                                                        }`}
                                                    >
                                                        X {item.maxUsage}
                                                    </span>
                                                </div>
                                                <div
                                                    className={`${totalPrice < item.minimumOrderPrice && 'text-[#737373]'}`}
                                                >
                                                    <h3 className='text-lg font-semibold'>{item.name.toUpperCase()}</h3>
                                                    <div className='select-none'>
                                                        {totalPrice < item.minimumOrderPrice ? (
                                                            <>
                                                                <p className='text-xs'>Chưa đạt giá tiền tối thiểu</p>
                                                                <p className='text-xs'>
                                                                    Yêu cầu: {formatCurrency(item.minimumOrderPrice)}
                                                                </p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p className='text-xs'>
                                                                    Giảm{' '}
                                                                    {item.discountType === 'percentage'
                                                                        ? `${item.voucherDiscount}% Tối đa ${formatCurrency(item.maxDiscountAmount)}`
                                                                        : `${formatCurrency(item.voucherDiscount)} trên giá trị đơn hàng`}{' '}
                                                                </p>
                                                                <p className='text-xs'>
                                                                    Đơn tối thiểu:{' '}
                                                                    {formatCurrency(item.minimumOrderPrice)}
                                                                </p>
                                                            </>
                                                        )}
                                                        <p className='text-xs'>
                                                            Hạn sử dụng:{' '}
                                                            {dayjs(item.endDate).diff(dayjs(), 'day') > 0
                                                                ? `${dayjs(item.endDate).diff(dayjs(), 'day')} ngày`
                                                                : `${dayjs(item.endDate).diff(dayjs(), 'hour')} giờ`}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                            </div>
                        )}
                        {/* <div className='h-[1px] w-full bg-[#737373]' /> */}
                    </div>
                )}

                {/* VOUCHER HIỆN CÓ */}
                <div className='mt-6'>
                    <h3 className='text-[#737373]'>Mã giảm giá hiện có</h3>
                    {voucherPending ? (
                        <div className='flex w-full items-center justify-center py-8'>
                            <Spin />
                        </div>
                    ) : (
                        <div className='mt-4 grid grid-cols-3 justify-center gap-5'>
                            {voucherData &&
                                voucherData
                                    .sort((a, b) => {
                                        const aEligible = totalPrice >= a.minimumOrderPrice ? 1 : 0;
                                        const bEligible = totalPrice >= b.minimumOrderPrice ? 1 : 0;
                                        const aRemainingUsage = a.usagePerUser - (a.usedCount || 0);
                                        const bRemainingUsage = b.usagePerUser - (b.usedCount || 0);
                                        const aIsExhausted = aRemainingUsage <= 0 ? 1 : 0;
                                        const bIsExhausted = bRemainingUsage <= 0 ? 1 : 0;
                                        return (
                                            aIsExhausted - bIsExhausted ||
                                            bEligible - aEligible ||
                                            bRemainingUsage - aRemainingUsage
                                        );
                                    })
                                    .map((item, index) => (
                                        <div
                                            onClick={() => {
                                                if (
                                                    totalPrice >= item.minimumOrderPrice ||
                                                    item.usagePerUser === item.usedCount
                                                ) {
                                                    handleChangeVoucher(item);
                                                }
                                            }}
                                            key={index}
                                            className={`relative flex w-full overflow-hidden ${
                                                totalPrice < item.minimumOrderPrice ||
                                                item.usagePerUser === item.usedCount
                                                    ? 'cursor-not-allowed border-[#737373]'
                                                    : 'cursor-pointer border-black'
                                            } items-center gap-5 rounded-md border bg-gray-50 px-4 py-4`}
                                        >
                                            {selectedVoucher === item && (
                                                <div className='absolute top-0 right-0 rounded-bl-sm bg-green-500 px-2 py-1'>
                                                    <CheckOutlined />
                                                </div>
                                            )}
                                            <div className='flex flex-col items-center select-none'>
                                                <img
                                                    src='https://cdn-icons-png.flaticon.com/512/4649/4649082.png'
                                                    className={`${
                                                        (totalPrice < item.minimumOrderPrice ||
                                                            item.usagePerUser === item.usedCount) &&
                                                        'opacity-50'
                                                    } w-8`}
                                                    alt=''
                                                />
                                                <span
                                                    className={`${
                                                        totalPrice < item.minimumOrderPrice ||
                                                        item.usagePerUser === item.usedCount
                                                            ? 'rounded-md bg-black/45 px-1.5 text-white'
                                                            : 'rounded-md bg-red-500 px-1.5 text-white'
                                                    }`}
                                                >
                                                    X {item.remainingQuantity}
                                                </span>
                                            </div>
                                            <div
                                                className={`${
                                                    (totalPrice < item.minimumOrderPrice ||
                                                        item.usagePerUser === item.usedCount) &&
                                                    'text-[#737373]'
                                                }`}
                                            >
                                                <h3 className='text-lg font-semibold'>{item.name.toUpperCase()}</h3>
                                                <div className='select-none'>
                                                    {totalPrice < item.minimumOrderPrice ||
                                                    item.usagePerUser === item.usedCount ? (
                                                        <>
                                                            {item.usagePerUser === item.usedCount ? (
                                                                <>
                                                                    <p className='text-xs'>
                                                                        Bạn đã hết lượt sử dụng mã này
                                                                    </p>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <p className='text-xs'>
                                                                        Chưa đạt giá tiền tối thiểu
                                                                    </p>
                                                                    <p className='text-xs'>
                                                                        Yêu cầu:{' '}
                                                                        {formatCurrency(item.minimumOrderPrice)}
                                                                    </p>
                                                                </>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p className='text-xs'>
                                                                Giảm{' '}
                                                                {item.discountType === 'percentage'
                                                                    ? `${item.voucherDiscount}% Tối đa ${formatCurrency(item.maxDiscountAmount)}`
                                                                    : `${formatCurrency(item.voucherDiscount)} trên giá trị đơn hàng`}{' '}
                                                            </p>
                                                            <p className='text-xs'>
                                                                Đơn tối thiểu: {formatCurrency(item.minimumOrderPrice)}
                                                            </p>
                                                            <p className='text-xs'>
                                                                Số lượt sử dụng còn lại:{' '}
                                                                {item.usedCount && item.usedCount !== 0
                                                                    ? item.usagePerUser - item.usedCount
                                                                    : item.usagePerUser}
                                                            </p>
                                                        </>
                                                    )}
                                                    {item.usedCount !== item.usagePerUser && (
                                                        <p className='text-xs'>
                                                            Hạn sử dụng:{' '}
                                                            {dayjs(item.endDate).diff(dayjs(), 'day') > 0
                                                                ? `${dayjs(item.endDate).diff(dayjs(), 'day')} ngày`
                                                                : `${dayjs(item.endDate).diff(dayjs(), 'hour')} giờ`}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                        </div>
                    )}
                    {/* <div className='h-[1px] w-full bg-[#737373]' /> */}
                </div>
            </Modal>
        </>
    );
}

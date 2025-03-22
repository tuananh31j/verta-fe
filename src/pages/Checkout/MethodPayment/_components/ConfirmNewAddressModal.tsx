import { Modal } from 'antd';
import { useCreateAddress } from '~/hooks/mutations/address/useCreateAddress';
import { IAddress, IPayloadCreateAddress } from '~/interfaces/address';
import { useTypedSelector } from '~/store/store';

export default function ConfirmNewAddressModal({
    isOpen,
    address,
    setOpen,
    paymentMethod,
    setOpenPayOs,
    setOpenCod,
}: {
    isOpen: boolean;
    address: IAddress[];
    setOpen: (e: boolean) => void;
    setOpenPayOs: (e: boolean) => void;
    setOpenCod: (e: boolean) => void;
    paymentMethod: 'COD' | 'PAYOS';
}) {
    const handleCancel = () => {
        setOpen(false);
        if (paymentMethod === 'COD') {
            setOpenCod(true);
        } else {
            setOpenPayOs(true);
        }
    };
    const { mutate } = useCreateAddress();
    const checkOutInfor = useTypedSelector((state) => state.checkOut);
    const handleConfirm = () => {
        const newAddress: IPayloadCreateAddress = {
            name: checkOutInfor.customerInfor.name,
            phone: checkOutInfor.customerInfor.phone,
            address: checkOutInfor.shippingAddress.address,
            country: 'Việt Nam',
            province: checkOutInfor.shippingAddress.province as string,
            district: checkOutInfor.shippingAddress.district as string,
            ward: checkOutInfor.shippingAddress.ward as string,
            districtId: Number(checkOutInfor.shippingAddress.districtId),
            provinceId: Number(checkOutInfor.shippingAddress.provinceId),
        };

        mutate(newAddress);
        if (paymentMethod === 'COD') {
            setOpenCod(true);
        } else {
            setOpenPayOs(true);
        }

        setOpen(false); // Close modal after confirming
    };

    return (
        <Modal open={isOpen} width={750} onCancel={handleCancel} footer={<></>} onClose={handleCancel} centered>
            <div>
                <h3 className='text-2xl font-bold'>Bạn có muốn thêm địa chỉ này vào địa chỉ của bạn?</h3>
                <h3 className='text-base font-semibold text-[#737373]'>Địa chỉ hiện có ({address.length} / 5)</h3>

                <div className='flex gap-18'>
                    <div>
                        <p className='mt-2 text-lg font-semibold'>Địa chỉ:</p>
                        <ul className='mt-2 flex flex-col gap-1'>
                            <li>
                                <span className='text-base'>
                                    Tỉnh/ Thành phố:{' '}
                                    <span className='font-semibold text-black'>
                                        {checkOutInfor.shippingAddress.province}
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span className='text-base'>
                                    Quận/ Huyện:{' '}
                                    <span className='font-semibold text-black'>
                                        {checkOutInfor.shippingAddress.district}
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span className='text-base'>
                                    Phường/ Xã:{' '}
                                    <span className='font-semibold text-black'>
                                        {checkOutInfor.shippingAddress.ward}
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span className='text-base'>
                                    Địa chỉ:{' '}
                                    <span className='font-semibold text-black'>
                                        {checkOutInfor.shippingAddress.address}
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className='mt-2 text-lg font-semibold'>Người nhận:</p>
                        <ul className='mt-2 flex flex-col gap-1'>
                            <li>
                                <span className='text-base'>
                                    Tên người nhận:{' '}
                                    <span className='font-semibold text-black'>{checkOutInfor.customerInfor.name}</span>
                                </span>
                            </li>
                            <li>
                                <span className='text-base'>
                                    Số điện thoại:{' '}
                                    <span className='font-semibold text-black'>
                                        {checkOutInfor.customerInfor.phone}
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='mt-8 flex gap-5'>
                    <button
                        onClick={handleCancel}
                        // disabled={isPending}
                        className='w-2/3 cursor-pointer rounded-md border border-red-500 py-2 text-base text-red-500 duration-300 hover:bg-red-500 hover:text-white'
                    >
                        HỦY BỎ
                    </button>
                    <button
                        onClick={handleConfirm}
                        className='w-2/3 cursor-pointer rounded-md border border-black text-base duration-300 hover:bg-black hover:text-white'
                    >
                        {/* {isPending ? <Spin /> : 'XÁC NHẬN'} */}
                        Xác nhận
                    </button>
                </div>
            </div>
        </Modal>
    );
}

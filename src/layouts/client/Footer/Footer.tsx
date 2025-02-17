import internetBanking from '~/assets/onlineBanking.webp';
import boCongThuong from '~/assets/boCongThuong.webp';

const Footer = () => {
    return (
        <div>
            <div className='bg-black p-10 text-white'>
                <div className='text-sm font-bold'>VERTU FASHION - THỜI TRANG CÔNG SỞ</div>
                <div className='mt-5 grid grid-cols-1 gap-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[2fr_2fr_2fr_1fr]'>
                    <div>
                        <div className='text-sm'>Số ĐKKD 0107861393, Sở KHĐT Tp. Hà Nội cấp ngày 04/10/2017</div>
                    </div>
                    <div>
                        <div className='text-sm'>Số ĐKKD 0107861393, Sở KHĐT Tp. Hà Nội cấp ngày 04/10/2017</div>
                    </div>
                    <div>
                        <div className='text-sm'>Số ĐKKD 0107861393, Sở KHĐT Tp. Hà Nội cấp ngày 04/10/2017</div>
                    </div>
                    <div>
                        <div className='text-sm'>Phương thức thanh toán</div>
                        <div className='mt-4 w-20'>
                            <img src={internetBanking} alt='internet banking' />
                        </div>
                        <div className='mt-4 w-28'>
                            <img src={boCongThuong} alt='internet banking' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white py-2 pl-4 font-semibold'>© 2025 - Bản quyền VERTA</div>
        </div>
    );
};

export default Footer;

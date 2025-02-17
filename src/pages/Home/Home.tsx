import 'swiper/css';
import 'swiper/css/navigation';
import HomeNewBannerOne from '~/assets/home_new_banner_1_2048x2048.webp';
import HomeNewBannerTwo from '~/assets/home_new_banner_2_2048x2048.webp';
import BannerSlider from '~/components/BannerSlider/BannerSlider';
import ProductWrapper from '~/components/ProductWrapper/ProductWrapper';
import '~/styles/customSwiper.css';

export default function HomePage() {
    return (
        <>
            <BannerSlider />
            <div className='my-1 flex items-center justify-between gap-1'>
                <div className='basis-[50%] bg-[#f0eff3]'>
                    <img src={HomeNewBannerOne} alt='Bộ sưu tập mới' />
                    <div className='flex items-baseline justify-between px-4 py-3'>
                        <span className='text-primary text-lg font-medium uppercase'> new collection</span>
                        <span className='text-primary text-sm font-thin uppercase'> shop now</span>
                    </div>
                </div>
                <div className='basis-[50%] bg-[#f0eff3]'>
                    <img src={HomeNewBannerTwo} alt='Danh mục' />
                    <div className='flex items-baseline justify-between px-4 py-3'>
                        <span className='text-primary text-lg font-medium uppercase'> dress</span>
                        <span className='text-primary text-sm font-thin uppercase'> shop now</span>
                    </div>
                </div>
            </div>
            <ProductWrapper title='Sản phẩm mới' />
        </>
    );
}

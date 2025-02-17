import { useCallback, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { A11y, Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import NavigatonSlider from '~/components/elements/NavigationSlider';
import '~/styles/customSwiper.css';
import ProductCard from '../ProductCard/ProductCard';

type Props<T> = {
    title: string;
    data?: T;
};

const ProductWrapper = <T extends {}>({ title, data }: Props<T>) => {
    const swiperRef = useRef<SwiperRef>(null);

    const nextSlide = useCallback(() => {
        if (!swiperRef.current) return;
        swiperRef.current.swiper.slidePrev();
    }, []);

    const prevSlide = useCallback(() => {
        if (!swiperRef.current) return;
        swiperRef.current.swiper.slidePrev();
    }, []);

    return (
        <div className='mt-5'>
            <h2 className='text-primary my-10 text-center text-[2rem] font-bold'>{title}</h2>
            <div className='relative'>
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation, A11y]}
                    spaceBetween={8}
                    slidesPerView={4}
                    loop
                    navigation={false}
                    keyboard={{ enabled: true, onlyInViewport: false }}
                >
                    <SwiperSlide>
                        <ProductCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProductCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProductCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProductCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProductCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <ProductCard />
                    </SwiperSlide>
                </Swiper>
                <NavigatonSlider prev handleAction={prevSlide} />
                <NavigatonSlider next handleAction={nextSlide} />
            </div>
        </div>
    );
};

export default ProductWrapper;

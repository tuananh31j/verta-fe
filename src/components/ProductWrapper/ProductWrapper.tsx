import { Spin } from 'antd';
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
    isPending: boolean;
    description?: string;
};

const ProductWrapper = <T extends object | undefined>({ title, data, isPending, description }: Props<T>) => {
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
            <h2 className={`text-primary ${description ? 'mt-8' : 'my-8'} text-center text-[2rem] font-bold`}>
                {title}
            </h2>
            {description && <p className='mt-2 mb-8 text-center text-sm'>{description}</p>}
            <div>
                {data ? (
                    !isPending ? (
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
                                {Array.isArray(data) &&
                                    data.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <ProductCard product={item} />
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                            <NavigatonSlider prev handleAction={prevSlide} />
                            <NavigatonSlider next handleAction={nextSlide} />
                        </div>
                    ) : (
                        <div className='flex min-h-[30vh] items-center justify-center'>
                            <Spin />
                        </div>
                    )
                ) : (
                    <div className='flex min-h-[30vh] items-center justify-center'>
                        <h3>Không có sản phẩm</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductWrapper;

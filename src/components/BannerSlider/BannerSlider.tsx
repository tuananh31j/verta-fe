import { Carousel } from 'antd';
import { useCallback, useRef } from 'react';

import { CarouselRef } from 'antd/es/carousel';
import bannerOne from '~/assets/ms_banner_img1_master.png';
import bannerTwo from '~/assets/ms_banner_img2_master.png';
import NavigatonSlider from '../elements/NavigationSlider';

export default function BannerSlider() {
    const slider = [bannerOne, bannerTwo];
    const slideRef = useRef<CarouselRef>(null);

    const nextSlide = useCallback(() => {
        slideRef.current?.next();
    }, []);

    const prevSlide = useCallback(() => {
        slideRef.current?.prev();
    }, []);

    return (
        <div className='relative'>
            <Carousel ref={slideRef} autoplay autoplaySpeed={3000} className='w-full'>
                {slider.map((slide, index) => (
                    <div key={index}>
                        <img src={slide} alt='banner' className='w-full' />
                    </div>
                ))}
            </Carousel>
            <NavigatonSlider prev handleAction={prevSlide} />
            <NavigatonSlider next handleAction={nextSlide} />
        </div>
    );
}

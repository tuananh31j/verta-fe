import { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import { A11y, Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import imageTest from '~/assets/productTest.webp';
import NavigatonSlider from '~/components/elements/NavigationSlider';
import '~/styles/customSwiper.css';
import { formatCurrency } from '~/utils/formatCurrrency';

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
            <h2 className='text-primary my-8 text-center text-[2rem] font-bold'>{title}</h2>
            <div className='relative'>
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation, A11y]}
                    spaceBetween={4}
                    slidesPerView={4}
                    loop
                    navigation={false}
                    keyboard={{ enabled: true, onlyInViewport: false }}
                >
                    <SwiperSlide>
                        <div className='group overflow-hidden select-none'>
                            <div className='relative'>
                                <div>
                                    <img src={imageTest} alt='product' className='w-full' />
                                </div>

                                <div className='text-red absolute top-0 right-0 bg-white px-6 py-1.5 text-xs font-semibold text-red-500'>
                                    <span>-30%</span>
                                </div>
                                <Link
                                    to='/'
                                    className='absolute top-0 bottom-0 left-0 flex w-full -translate-x-full bg-black/50 duration-300 group-hover:translate-x-0'
                                >
                                    <span className='hover:text-primary absolute top-[50%] right-[10%] left-[10%] block border border-white px-4 py-1.5 text-center font-bold text-white uppercase hover:bg-white'>
                                        Xem thêm
                                    </span>
                                </Link>
                            </div>
                            <Link
                                to='/'
                                className='text-secondary hover:text-primary mt-3 mb-9 block text-center text-sm font-bold duration-300'
                            >
                                QUẦN CULOTTES Q15702
                            </Link>
                            <div className='flex items-center justify-center gap-3'>
                                <span className='text-primary block text-center text-base font-bold'>
                                    {formatCurrency(999000)}
                                </span>
                                <span className='text-primary block text-center text-base font-light text-red-500 line-through'>
                                    {formatCurrency(100000)}
                                </span>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='group relative overflow-hidden'>
                            <div>
                                <img src={imageTest} alt='product' className='w-full' />
                            </div>
                            <Link
                                to='/'
                                className='absolute top-0 bottom-0 left-0 flex w-full -translate-x-full bg-black/50 duration-300 group-hover:translate-x-0'
                            >
                                <span className='hover:text-primary absolute top-[50%] right-[10%] left-[10%] block border border-white px-4 py-1.5 text-center font-bold text-white uppercase hover:bg-white'>
                                    Xem thêm
                                </span>
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='group relative overflow-hidden'>
                            <div>
                                <img src={imageTest} alt='product' className='w-full' />
                            </div>
                            <Link
                                to='/'
                                className='absolute top-0 bottom-0 left-0 flex w-full -translate-x-full bg-black/50 duration-300 group-hover:translate-x-0'
                            >
                                <span className='hover:text-primary absolute top-[50%] right-[10%] left-[10%] block border border-white px-4 py-1.5 text-center font-bold text-white uppercase hover:bg-white'>
                                    Xem thêm
                                </span>
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='group relative overflow-hidden'>
                            <div>
                                <img src={imageTest} alt='product' className='w-full' />
                            </div>
                            <Link
                                to='/'
                                className='absolute top-0 bottom-0 left-0 flex w-full -translate-x-full bg-black/50 duration-300 group-hover:translate-x-0'
                            >
                                <span className='hover:text-primary absolute top-[50%] right-[10%] left-[10%] block border border-white px-4 py-1.5 text-center font-bold text-white uppercase hover:bg-white'>
                                    Xem thêm
                                </span>
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='group relative overflow-hidden'>
                            <div>
                                <img src={imageTest} alt='product' className='w-full' />
                            </div>
                            <Link
                                to='/'
                                className='absolute top-0 bottom-0 left-0 flex w-full -translate-x-full bg-black/50 duration-300 group-hover:translate-x-0'
                            >
                                <span className='hover:text-primary absolute top-[50%] right-[10%] left-[10%] block border border-white px-4 py-1.5 text-center font-bold text-white uppercase hover:bg-white'>
                                    Xem thêm
                                </span>
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='group relative overflow-hidden'>
                            <div>
                                <img src={imageTest} alt='product' className='w-full' />
                            </div>
                            <Link
                                to='/'
                                className='absolute top-0 bottom-0 left-0 flex w-full -translate-x-full bg-black/50 duration-300 group-hover:translate-x-0'
                            >
                                <span className='hover:text-primary absolute top-[50%] right-[10%] left-[10%] block border border-white px-4 py-1.5 text-center font-bold text-white uppercase hover:bg-white'>
                                    Xem thêm
                                </span>
                            </Link>
                        </div>
                    </SwiperSlide>
                </Swiper>
                <NavigatonSlider prev handleAction={prevSlide} />
                <NavigatonSlider next handleAction={nextSlide} />
            </div>
        </div>
    );
};

export default ProductWrapper;

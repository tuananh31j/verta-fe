import { Spin } from 'antd';
import { useCallback, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { A11y, Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import NavigatonSlider from '~/components/elements/NavigationSlider';
import ProductCard from '~/components/ProductCard/ProductCard';
import { useGetRelatedProductDetail } from '~/hooks/queries/products/useGetRelatedProductDetail';
import { IProductDetail } from '~/interfaces/product';
import '~/styles/customSwiper.css';

type Props = {
    data: IProductDetail;
};

const ProductRelated = ({ data }: Props) => {
    const { data: relatedData, isPending } = useGetRelatedProductDetail(data._id, data.categories[0] as string);

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
            <h2 className='text-primary my-8 text-center text-[2rem] font-bold'>SẢN PHẨM TƯƠNG TỰ</h2>
            {relatedData ? (
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
                            {relatedData.map((item, index) => (
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
                    <h3 className='text-xl font-semibold'>Không có sản phẩm nào</h3>
                </div>
            )}
        </div>
    );
};

export default ProductRelated;

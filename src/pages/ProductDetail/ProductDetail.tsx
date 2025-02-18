import { Spin } from 'antd';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetDetailProduct } from '~/hooks/queries/products/useGetDetailProduct';
import { ISizeInColor, IVariantDetail } from '~/interfaces/product';
import { formatCurrency } from '~/utils/formatCurrrency';
import ActionProductDetail from './_components/ActionProductDetail';
import ProductRelated from './_components/ProductRelated';
import ThumbnailProductsDetail from './_components/ThumbnailProductsDetail';

export default function ProductDetail() {
    const { id } = useParams();
    const { data, isPending } = useGetDetailProduct(id as string);
    const imagesProducts = data?.variants.map((item) => item.color.image);
    const [selectedSize, setSelectedSize] = useState<ISizeInColor | null>();
    const [selectedColor, setSelectedColor] = useState<IVariantDetail>();

    return data && !isPending ? (
        <div className='mt-4'>
            <div className='border-b border-gray-300 pb-4'>
                <div className='mx-6 flex max-w-7xl items-center gap-2 text-sm font-normal xl:mx-auto'>
                    <Link to={'/'} className='uppercase'>
                        Trang chủ
                    </Link>{' '}
                    / <h3 className='uppercase'>Tất cả sản phẩm</h3> / <h3 className='uppercase'>Chi tiết sản phẩm</h3>
                </div>
            </div>
            <div className='mx-6 my-20 max-w-7xl xl:mx-auto'>
                <div className='grid grid-cols-[60%_30%] gap-15'>
                    <div>
                        <ThumbnailProductsDetail
                            images={imagesProducts as string[]}
                            selectedColor={selectedColor as IVariantDetail}
                            variants={data.variants}
                        />
                    </div>
                    <div>
                        <h3 className='text-lg font-bold text-[#070707] uppercase'>{data.name}</h3>
                        <div className='mt-2 text-sm text-[#070707]'>
                            <p className='capitalize'>Thương hiệu: VERTA</p>
                            <p className='uppercase'>Mã sản phẩm: {id}</p>
                        </div>
                        <p className='my-4 text-2xl font-bold text-[#070707]'>{formatCurrency(data.price)}</p>
                        <ActionProductDetail
                            variants={data.variants}
                            selectedColor={selectedColor as IVariantDetail}
                            selectedSize={selectedSize as ISizeInColor}
                            setColorVariant={setSelectedColor}
                            setSizeSelect={setSelectedSize}
                        />
                        <div className='mt-4 text-sm'>
                            {/* DESCRIPTION ĐÂY NHÉ */}
                            <p className='font-semibold'>Mô tả: </p>
                            {data.summary}
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-[1px] w-full bg-[#8f8f8f]' />
            <div className='mx-6 mt-20 mb-16 max-w-7xl xl:mx-auto'>
                <ProductRelated data={data} />
            </div>
        </div>
    ) : (
        <div className='flex min-h-[70vh] items-center justify-center'>
            <Spin />
        </div>
    );
}

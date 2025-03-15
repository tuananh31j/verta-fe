import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetDetailProduct } from '~/hooks/queries/products/useGetDetailProduct';
import { ISizeInColor, IVariantDetail } from '~/interfaces/product';
import { formatCurrency } from '~/utils/formatCurrrency';
import ActionProductDetail from './_components/ActionProductDetail';
import ProductRelated from './_components/ProductRelated';
import ThumbnailProductsDetail from './_components/ThumbnailProductsDetail';
import ProductReviews from './_components/ProductReviews';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';

export default function ProductDetail() {
    const { id } = useParams();
    const { data, isPending, isError } = useGetDetailProduct(id as string);
    const imagesProducts = data?.variants.map((item) => item.color.image);
    const [selectedSize, setSelectedSize] = useState<ISizeInColor | null>();
    const [selectedColor, setSelectedColor] = useState<IVariantDetail>();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            queryClient.refetchQueries({
                predicate: (query) =>
                    query.queryKey.includes(QUERY_KEY.PRODUCTS.ROOT) ||
                    query.queryKey.includes(QUERY_KEY.CART) ||
                    query.queryKey.includes(QUERY_KEY.ORDERS.ROOT),
            });
            navigate('/', { replace: true });
        }
    }, [data, isError, navigate, queryClient]);

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
                        <ProductReviews />
                    </div>
                    <div>
                        <h3 className='text-lg font-bold text-[#070707] uppercase'>{data.name}</h3>
                        <div className='mt-2 text-sm text-[#070707]'>
                            <p className='capitalize'>Thương hiệu: VERTA</p>
                            <p className='capitalize'>Danh mục: {data.categories.map((item) => item.name).join('/')}</p>
                            <p className='uppercase'>Mã sản phẩm: {data.code}</p>
                        </div>
                        <p className='my-4 text-2xl font-bold text-[#070707]'>{formatCurrency(data.price)}</p>
                        <ActionProductDetail
                            variants={data.variants}
                            selectedColor={selectedColor as IVariantDetail}
                            selectedSize={selectedSize as ISizeInColor}
                            setColorVariant={setSelectedColor}
                            setSizeSelect={setSelectedSize}
                        />
                    </div>
                </div>
            </div>
            <article className='mx-6 my-20 max-w-7xl xl:mx-auto' dangerouslySetInnerHTML={{ __html: data.summary }} />
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

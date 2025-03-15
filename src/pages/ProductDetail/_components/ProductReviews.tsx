import { Pagination, Rate, Spin } from 'antd';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useFilter from '~/hooks/common/useFilter';
import useGetAllReviewsProduct from '~/hooks/queries/reviews/useGetAllReviewsProduct';
import useGetAllReviewStar from '~/hooks/queries/reviews/useGetAllReviewStar';
import { setScrollTo } from '~/store/slice/scrollToTopSlice';
import { Params } from '~/types/Api';
import ReviewItem from './ReviewItem';
import ReviewStars from './ReviewStars';

const ProductReviews = () => {
    const { id } = useParams();
    const { reset, query, updateQueryParam } = useFilter();
    const { data: reviewData, isLoading } = useGetAllReviewsProduct(id as string, query);
    const { data: reviewStarData } = useGetAllReviewStar(id as string);
    const dispatch = useDispatch();

    const handleUpdateQueryParams = useCallback((queryParams: Params) => {
        updateQueryParam(queryParams);
        dispatch(setScrollTo('reviews'));
    }, []);

    return (
        <div className='mt-20 border-t border-black/40 bg-white'>
            <h4 className='mt-10 mb-6 text-2xl font-medium'>Đánh giá sản phẩm</h4>
            <div>
                <div className='flex justify-between gap-16 rounded-sm border border-gray-100 bg-gray-50 p-8'>
                    <div className='basis-[25%]'>
                        <div className='text-lg'>
                            <span className='text-2xl font-bold'>{reviewStarData?.everage || 0}</span> trên 5
                        </div>
                        <div className='mt-2'>
                            <Rate
                                allowHalf
                                disabled
                                defaultValue={reviewStarData?.everage || 0}
                                value={reviewStarData?.everage}
                                style={{
                                    fontSize: 18,
                                }}
                            />
                        </div>
                    </div>
                    <div className='flex basis-[70%] flex-wrap gap-3'>
                        {reviewStarData && (
                            <ReviewStars
                                reviews={reviewStarData.reviewsStar}
                                handleUpdateQueryParams={handleUpdateQueryParams}
                                reset={reset}
                                query={query}
                            />
                        )}
                    </div>
                </div>
                <div className='relative mt-5'>
                    <div className='p-4'>
                        {reviewData?.data.data.map((item) => <ReviewItem key={item._id} item={item} />)}
                    </div>
                    {isLoading && (
                        <div className='absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
                            <Spin />
                        </div>
                    )}

                    {reviewData && reviewData?.data.data.length > 0 && (
                        <div className='my-3'>
                            <Pagination
                                align='center'
                                onChange={(page) => {
                                    updateQueryParam({ ...query, page: page });
                                    dispatch(setScrollTo('reviews'));
                                }}
                                defaultCurrent={Number(query.page) || 1}
                                current={Number(query.page) || 1}
                                total={reviewData?.totalDocs as number}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductReviews;

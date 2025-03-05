import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { IReviewStarResponse } from '~/interfaces/review';
import { setScrollTo } from '~/store/slice/scrollToTopSlice';
import { Params } from '~/types/Api';

type Props = {
    reviews: IReviewStarResponse['reviewsStar'];
    handleUpdateQueryParams: (query: Params) => void;
    reset: () => void;
    query: Params;
};

const ReviewStars = ({ reviews, reset, handleUpdateQueryParams, query }: Props) => {
    const dispatch = useDispatch();
    console.log(reviews);

    const handleShowStar = (star: number) => {
        return reviews.filter((item) => item.rating === star).length;
    };
    const reviewStars = [
        {
            rate: 5,
            count: handleShowStar(5),
        },
        {
            rate: 4,
            count: handleShowStar(4),
        },
        {
            rate: 3,
            count: handleShowStar(3),
        },
        {
            rate: 2,
            count: handleShowStar(2),
        },
        {
            rate: 1,
            count: handleShowStar(1),
        },
    ];
    return (
        <>
            {' '}
            <div
                onClick={() => {
                    reset();
                    dispatch(setScrollTo('reviews'));
                }}
                className='flex h-8 cursor-pointer items-center justify-between border border-black/80 bg-white px-4 py-1 duration-300 hover:border-black'
            >
                Tất cả
            </div>
            {reviewStars.map((item, index) => (
                <div
                    key={index}
                    onClick={() => {
                        handleUpdateQueryParams({ ...query, rating: item.rate });
                    }}
                    className='flex h-8 cursor-pointer items-center justify-between gap-1 border border-black/80 bg-white px-4 py-1 duration-300 select-none hover:border-black'
                >
                    {item.rate} Sao <span className='text-xs'>({item.count})</span>
                </div>
            ))}
        </>
    );
};

export default memo(ReviewStars);

import { Avatar, Rate } from 'antd';
import { memo } from 'react';
import { IReviewItem } from '~/interfaces/review';
import dayjs from 'dayjs';

type Props = {
    item: IReviewItem;
};

const ReviewItem = ({ item }: Props) => {
    return (
        <div className='mt-4 border-b border-gray-200 pb-4'>
            <div className='flex gap-3'>
                <Avatar icon={<img src={item?.userId?.avatar} alt='ảnh đại diện' />} />
                <div>
                    <span className='text-sm'>{item?.userId?.name || 'Người dùng'}</span>
                    <div>
                        <Rate defaultValue={item.rating} disabled style={{ fontSize: 14 }} />
                    </div>
                    <div className='mt-1 flex flex-wrap items-baseline bg-white'>
                        <div className='text-secondary text-sm'>
                            {dayjs(item.createdAt).format('DD-MM-YYYY HH:mm')}
                            <span className='mx-1 inline-block'>|</span> <span> Phân loại hàng</span>{' '}
                            <span className='mx-1 inline-block'>|</span>
                            {item.variants[0].name}
                            {item.variants.map((variant) => (
                                <div key={variant.variantId} className='inline-block'>
                                    <span className='mx-1 inline-block'>|</span>
                                    <button
                                        className={`relative top-[-4px] mr-1.5 ml-0.5 overflow-hidden rounded-full border px-2 py-2 text-sm transition-all`}
                                        style={{
                                            background: `${variant.color}`,
                                        }}
                                    ></button>
                                    <span>{variant.size}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <p className='mt-5'>{item.content}</p>
        </div>
    );
};

export default memo(ReviewItem);

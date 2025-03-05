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
                <Avatar icon={<img src={item?.userId.avatar} alt='ảnh đại diện' />} />
                <div>
                    <span className='text-sm'>{item?.userId.name}</span>
                    <div>
                        <Rate defaultValue={item.rating} disabled style={{ fontSize: 14 }} />
                    </div>
                    <div className='mt-1 flex items-baseline'>
                        <div className='text-secondary text-sm'>
                            {dayjs(item.createdAt).format('DD-MM-YYYY HH:mm')}
                            <span className='mx-1 inline-block'>|</span> <span> Phân loại hàng</span>{' '}
                            <span className='mx-1 inline-block'>|</span>
                            {item.variant.name}
                            <span className='mx-1 inline-block'>|</span>
                            <button
                                style={{ backgroundColor: `${item.variant.color}}` }}
                                className={`relative top-[-4px] mr-1.5 ml-0.5 overflow-hidden rounded-full border px-2 py-2 text-sm transition-all`}
                            ></button>
                            <span>{item.variant.size}</span>
                        </div>
                    </div>
                </div>
            </div>
            <p className='mt-5'>{item.content}</p>
        </div>
    );
};

export default memo(ReviewItem);

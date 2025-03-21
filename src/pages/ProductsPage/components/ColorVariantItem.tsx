import { memo } from 'react';
import { useTypedSelector } from '~/store/store';
import { IColor } from '~/types/Color';

type COlorVariantItemProps = {
    item: Omit<IColor, 'image'>;
    updateQueryParam: (id: string) => void;
};

const ColorVariantItem = ({ item, updateQueryParam }: COlorVariantItemProps) => {
    const query = useTypedSelector((state) => state.filter.query);
    const queryValue = query['color']?.split(',') || [];

    return (
        <>
            <button
                onClick={() => updateQueryParam(item._id)}
                className={`cursor-pointer rounded-full border-2 px-3 py-3 ${queryValue.includes(item._id) ? 'border-gray-700' : 'border-gray-100 hover:border-gray-700'} text-sm transition-all`}
                style={{
                    background: `${item.hex}`,
                }}
            ></button>
        </>
    );
};

export default memo(ColorVariantItem);

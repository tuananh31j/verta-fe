import { useTypedSelector } from '~/store/store';
import { ISize } from '~/types/Size';
import { memo } from 'react';

type SizeVariantItemProps = {
    item: ISize;
    updateQueryParam: (id: string) => void;
};

const SizeVariantItem = ({ item, updateQueryParam }: SizeVariantItemProps) => {
    const query = useTypedSelector((state) => state.filter.query);
    const queryValue = query['size']?.split(',') || [];

    return (
        <>
            <div
                onClick={() => updateQueryParam(item._id)}
                className={`flex h-8 cursor-pointer items-center ${queryValue.includes(item._id) ? 'border-black' : 'border-black/30 hover:border-black'} justify-center border bg-white px-4 py-1 duration-300 select-none hover:border-black`}
            >
                {item.value}
            </div>
        </>
    );
};

export default memo(SizeVariantItem);

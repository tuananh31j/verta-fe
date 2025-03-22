import { useCallback } from 'react';
import useGetAllColors from '~/hooks/Colors/Queries/useGetAllColors';
import useFilter from '~/hooks/common/useFilter';
import ColorVariantItem from './ColorVariantItem';
import { Spin } from 'antd';

const ColorList = () => {
    const { query, updateQueryParam } = useFilter();
    const { data: colors, isLoading } = useGetAllColors();

    const handleFilter = useCallback(
        (id: string) => {
            let queryValue = '';
            if (query['color']?.includes(id)) {
                queryValue = query['color']
                    .split(',')
                    .filter((item: string) => item !== id)
                    .join(',');
            } else {
                queryValue = query['color'] ? `${query['color']},${id}` : id;
            }
            updateQueryParam({
                ...query,
                ['color']: queryValue,
                page: 1,
            });
        },
        [query, updateQueryParam]
    );

    return (
        <div className='relative p-1'>
            <div className='grid grid-cols-6 gap-4'>
                {colors?.map((color) => (
                    <ColorVariantItem updateQueryParam={handleFilter} key={color._id} item={color} />
                ))}
            </div>
            {isLoading && <Spin size='small' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />}
        </div>
    );
};

export default ColorList;

import { useCallback } from 'react';
import useFilter from '~/hooks/common/useFilter';
import useGetAllSizes from '~/hooks/Sizes/Queries/useGetAllSizes';
import SizeVariantItem from './SizeVariantItem';
import { Spin } from 'antd';

const SizeList = () => {
    const { query, updateQueryParam } = useFilter();
    const { data: sizes, isLoading } = useGetAllSizes({});

    const handleFilter = useCallback(
        (id: string) => {
            let queryValue = '';
            if (query['size']?.includes(id)) {
                queryValue = query['size']
                    .split(',')
                    .filter((item: string) => item !== id)
                    .join(',');
            } else {
                queryValue = query['size'] ? `${query['size']},${id}` : id;
            }
            updateQueryParam({
                ...query,
                ['size']: queryValue,
                page: 1,
            });
        },
        [query, updateQueryParam]
    );

    return (
        <div className='p-1'>
            <div className='grid grid-cols-4 gap-4'>
                {sizes?.map((size) => <SizeVariantItem updateQueryParam={handleFilter} key={size._id} item={size} />)}
            </div>
            {isLoading && <Spin size='small' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />}
        </div>
    );
};

export default SizeList;

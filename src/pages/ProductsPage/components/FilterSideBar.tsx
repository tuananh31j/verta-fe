import { CheckOutlined } from '@ant-design/icons';
import { useCallback } from 'react';
import useFilter from '~/hooks/common/useFilter';
import { useGetAllCate } from '~/hooks/queries/categories/useGetAllCate';

const FilterSideBar = () => {
    const { data: categories } = useGetAllCate();
    const { query, updateQueryParam } = useFilter();
    const queryValues = query['categories']?.split(',') || [];

    const handleFilter = useCallback(
        (id: string) => {
            let queryValue = '';
            if (query['categories']?.includes(id)) {
                queryValue = query['categories']
                    .split(',')
                    .filter((item: string) => item !== id)
                    .join(',');
            } else {
                queryValue = query['categories'] ? `${query['categories']},${id}` : id;
            }
            updateQueryParam({
                ...query,
                ['categories']: queryValue,
                page: 1,
            });
        },
        [query, updateQueryParam]
    );

    return (
        <>
            <span className='block text-sm font-bold'>Danh mục</span>
            <span className='block text-sm font-bold'>Tất cả sản phẩm</span>
            <div className='mt-4'>
                {categories?.map((category) => (
                    <div key={category._id} className='mt-2'>
                        <span
                            className={`block cursor-pointer text-sm font-bold capitalize`}
                            onClick={() => handleFilter(category._id)}
                        >
                            {category.name}
                            {queryValues.includes(category._id) ? <CheckOutlined className='ml-1' /> : ''}
                        </span>
                        <div className='mt-2'>
                            {category.items.map((subCategory) => (
                                <span
                                    key={subCategory._id}
                                    className={`block cursor-pointer text-sm font-semibold capitalize duration-300 ${queryValues.includes(subCategory._id) ? 'text-primary' : 'text-secondary hover:text-primary'}`}
                                    onClick={() => handleFilter(subCategory._id)}
                                >
                                    {subCategory.name}{' '}
                                    {queryValues.includes(subCategory._id) ? <CheckOutlined className='ml-1' /> : ''}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default FilterSideBar;

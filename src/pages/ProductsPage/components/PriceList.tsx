import { Radio, RadioChangeEvent } from 'antd';
import { useState } from 'react';
import useFilter from '~/hooks/common/useFilter';
import { formatCurrency } from '~/utils/formatCurrrency';

const PriceList = () => {
    const { query, updateQueryParam } = useFilter();
    const [value, setValue] = useState<string>('all');

    const handleChangeFilterPrice = (e: RadioChangeEvent) => {
        const targetValue = e.target.value;

        switch (targetValue) {
            case 'all':
                updateQueryParam({
                    ...query,
                    ['price[gte]']: null,
                    ['price[lte]']: null,
                    selectPrice: 'all',
                    page: 1,
                });
                setValue('all');
                break;
            case 'lte-500000':
                updateQueryParam({
                    ...query,
                    ['price[gte]']: null,
                    ['price[lte]']: 500000,
                    selectPrice: 'lte-500000',
                    page: 1,
                });
                setValue('lte-500000');

                break;
            case 'gte-500000,lte-1000000':
                updateQueryParam({
                    ...query,
                    ['price[gte]']: 500000,
                    ['price[lte]']: 1000000,
                    selectPrice: 'gte-500000,lte-1000000',
                    page: 1,
                });
                setValue('gte-500000,lte-1000000');

                break;
            case 'gte-1500000,lte-2000000':
                updateQueryParam({
                    ...query,
                    ['price[gte]']: 1500000,
                    ['price[lte]']: 2000000,
                    selectPrice: 'gte-1500000,lte-2000000',
                    page: 1,
                });
                setValue('gte-1500000,lte-2000000');

                break;
            case 'gte-2000000,lte-3000000':
                updateQueryParam({
                    ...query,
                    ['price[gte]']: 2000000,
                    ['price[lte]']: 3000000,
                    selectPrice: 'gte-2000000,lte-3000000',

                    page: 1,
                });
                setValue('gte-2000000,lte-3000000');

                break;
            case 'gte-3000000':
                updateQueryParam({
                    ...query,
                    ['price[gte]']: 3000000,
                    ['price[lte]']: null,
                    selectPrice: 'gte-3000000',
                    page: 1,
                });
                setValue('gte-3000000');
                break;

            default:
                break;
        }
    };

    const priceOptions = [
        { value: 'all', label: <span className='text-primary'>Tất cả</span> },
        {
            value: 'lte-500000',
            label: (
                <div className='text-primary text-sm'>
                    Nhỏ hơn <span>{formatCurrency(500000)}</span>
                </div>
            ),
        },
        {
            value: 'gte-500000,lte-1000000',
            label: (
                <div className='text-primary text-sm'>
                    Từ <span>{formatCurrency(500000)}</span> - <span>{formatCurrency(1000000)}</span>
                </div>
            ),
        },
        {
            value: 'gte-1500000,lte-2000000',
            label: (
                <div className='text-primary text-sm'>
                    Từ <span>{formatCurrency(1500000)}</span> - <span>{formatCurrency(2000000)}</span>
                </div>
            ),
        },
        {
            value: 'gte-2000000,lte-3000000',
            label: (
                <div className='text-primary text-sm'>
                    Từ <span>{formatCurrency(2000000)}</span> - <span>{formatCurrency(3000000)}</span>
                </div>
            ),
        },
        {
            value: 'gte-3000000',
            label: (
                <div className='text-primary text-sm'>
                    Lớn hơn <span>{formatCurrency(3000000)}</span>
                </div>
            ),
        },
    ];

    return (
        <div className='p-1'>
            <Radio.Group
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                }}
                defaultValue={'all'}
                value={query.selectPrice || 'all'}
                onChange={handleChangeFilterPrice}
                options={priceOptions}
            />
        </div>
    );
};

export default PriceList;

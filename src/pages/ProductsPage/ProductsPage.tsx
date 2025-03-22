import { CaretDownOutlined, CaretUpOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Pagination, Popover, Space, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import twoColsIcon from '~/assets/icons/2col.webp';
import threeColsIcon from '~/assets/icons/3col.webp';
import ProductCard from '~/components/ProductCard/ProductCard';
import useFilter from '~/hooks/common/useFilter';
import { useGetAllProducts } from '~/hooks/queries/products/useGetAllProducts';
import useWindowSize from '../../hooks/_common/useWindowSize';
import ColorList from './components/ColorList';
import FilterSideBar from './components/FilterSideBar';
import PriceList from './components/PriceList';
import SizeList from './components/SizeList';

const ProductsPage = () => {
    const { query, grid, updateGridUI, updateQueryParam, reset } = useFilter();
    const [isSizeOpen, setIsSizeOpen] = useState(false);
    const [isColorOpen, setIsColorOpen] = useState(false);
    const [isPriceOpen, setIsPriceOpen] = useState(false);
    const { windowWidth } = useWindowSize();
    const { data, isLoading } = useGetAllProducts({ ...query, limit: grid === '3' ? '9' : '10' });
    const productsList = data?.data;
    const totalDocs = data?.totalDocs;
    const queryKeys = Object.keys(query);

    useEffect(() => {
        if (grid) {
            updateGridUI('');
        }
    }, [windowWidth]);

    return (
        <>
            <div className='mt-4'>
                <div className='border-b border-gray-300 pb-4'>
                    <div className='mx-6 flex max-w-7xl items-center gap-2 text-sm font-normal xl:mx-auto'>
                        <Link to={'/'} className='uppercase'>
                            Trang chủ
                        </Link>{' '}
                        / <h3 className='uppercase'>Tất cả sản phẩm</h3> /{' '}
                    </div>
                </div>
            </div>
            <div className='lg:max-w-standard mx-auto mt-14 w-full xl:max-w-7xl'>
                <div className='flex gap-4'>
                    <div className='basis-96'>
                        <FilterSideBar />
                    </div>
                    <div className='basis-full'>
                        <div className='mb-14 flex justify-between'>
                            <span className='text-xl font-extrabold'>Sản phẩm mới</span>
                            <div className='flex gap-20'>
                                <Popover content={<SizeList />} trigger='click' placement='bottom' open={isSizeOpen}>
                                    <div
                                        className='text-secondary flex cursor-pointer items-center gap-1 text-[0.938rem] font-semibold select-none'
                                        onClick={() => setIsSizeOpen(!isSizeOpen)}
                                    >
                                        Kích cỡ
                                        {isSizeOpen ? <CaretUpOutlined /> : <CaretDownOutlined />}
                                    </div>
                                </Popover>
                                <Popover content={<ColorList />} trigger='click' placement='bottom' open={isColorOpen}>
                                    <div
                                        onClick={() => setIsColorOpen(!isColorOpen)}
                                        className='text-secondary flex cursor-pointer items-center gap-1 text-[0.938rem] font-semibold select-none'
                                    >
                                        Màu sắc
                                        {isColorOpen ? <CaretUpOutlined /> : <CaretDownOutlined />}
                                    </div>
                                </Popover>
                                <Popover content={<PriceList />} trigger='click' placement='bottom' open={isPriceOpen}>
                                    <div
                                        onClick={() => setIsPriceOpen(!isPriceOpen)}
                                        className='text-secondary flex cursor-pointer items-center gap-1 text-[0.938rem] font-semibold select-none'
                                    >
                                        Giá {isPriceOpen ? <CaretUpOutlined /> : <CaretDownOutlined />}
                                    </div>
                                </Popover>
                                <div className='flex gap-3'>
                                    <img
                                        src={threeColsIcon}
                                        alt='three col icon'
                                        className='block h-4.5 w-4.5 cursor-pointer'
                                        onClick={() => updateGridUI('3')}
                                    />
                                    <img
                                        src={twoColsIcon}
                                        alt='two col icon'
                                        className='block h-4.5 w-4.5 cursor-pointer'
                                        onClick={() => updateGridUI('2')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            {queryKeys.length > 0 && (
                                <div className='mb-3'>
                                    <Button onClick={() => reset()} icon={<ReloadOutlined />}>
                                        Đặt lại
                                    </Button>
                                </div>
                            )}

                            {isLoading && (
                                <div className='relative flex min-h-[200px] items-center justify-center'>
                                    <Spin size='large' />
                                </div>
                            )}
                            <div
                                className={`grid ${grid ? `grid-cols-${grid}` : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} relative gap-2`}
                            >
                                {productsList?.map((product) => <ProductCard product={product} key={product._id} />)}
                            </div>
                            {(totalDocs as number) > 0 && (
                                <Space className='m-10 flex w-full justify-center'>
                                    <Pagination
                                        pageSize={9}
                                        current={(query.page as number) || 1}
                                        onChange={(page) => updateQueryParam({ ...query, page })}
                                        total={totalDocs}
                                        size='default'
                                    />
                                </Space>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductsPage;

import { useParams } from 'react-router-dom';
import ThumbnailProductsDetail from './_components/ThumbnailProductsDetail';

export default function ProductDetail() {
    const { id } = useParams();
    console.log(id);
    return (
        <div>
            <div className='border-b border-gray-300 pb-4'>
                <div className='mx-6 flex max-w-7xl items-center gap-2 text-sm font-normal xl:mx-auto'>
                    <h3 className='uppercase'>Trang chủ</h3> / <h3 className='uppercase'>Tất cả sản phẩm</h3> /{' '}
                    <h3 className='uppercase'>Chi tiết sản phẩm</h3>
                </div>
            </div>
            <div className='mx-6 mt-20 max-w-7xl xl:mx-auto'>
                <div className='grid grid-cols-[60%_30%]'>
                    <div>
                        <ThumbnailProductsDetail />
                    </div>
                    <div>
                        <h3 className='text-lg font-bold text-[#070707] uppercase'>QUẦN CULOTTES Q15702</h3>
                        <div className='mt-2 text-sm text-[#070707]'>
                            <p className='capitalize'>Thương hiệu: VERTA</p>
                            <p className='uppercase'>Mã sản phẩm: {id}</p>
                        </div>
                        <p className='my-4 text-2xl font-bold text-[#070707]'>990.000đ</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

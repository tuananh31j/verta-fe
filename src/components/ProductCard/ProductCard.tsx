import { Link } from 'react-router-dom';
import imageTest from '~/assets/productTest.webp';
import { formatCurrency } from '~/utils/formatCurrrency';

export default function ProductCard() {
    return (
        <div className='group overflow-hidden select-none'>
            <div className='relative'>
                <div>
                    <img src={imageTest} alt='product' className='w-full' />
                </div>

                <div className='text-red absolute top-0 right-0 bg-white px-6 py-1.5 text-xs font-semibold text-red-500'>
                    <span>-30%</span>
                </div>
                <Link
                    to='/'
                    className='absolute top-0 bottom-0 left-0 flex w-full -translate-x-full bg-black/50 opacity-0 duration-300 group-hover:translate-x-0 group-hover:opacity-100'
                >
                    <span className='hover:text-primary absolute top-[50%] right-[10%] left-[10%] block border border-white px-4 py-1.5 text-center font-bold text-white uppercase hover:bg-white'>
                        Xem thêm
                    </span>
                </Link>
            </div>
            <Link
                to='/'
                className='text-secondary hover:text-primary mt-3 mb-5 block text-center text-sm font-bold duration-300'
            >
                QUẦN CULOTTES Q15702
            </Link>
            <div className='flex items-center justify-center gap-3'>
                <span className='text-primary block text-center text-base font-bold'>{formatCurrency(999000)}</span>
                <span className='block text-center text-base font-light text-red-500 line-through'>
                    {formatCurrency(100000)}
                </span>
            </div>
        </div>
    );
}

import { Link } from 'react-router-dom';
import { useTypedSelector } from '~/store/store';
import OrderTable from './Components/OrderTable';

const MyOrders = () => {
    const username = useTypedSelector((state) => state.auth.user?.name);

    return (
        <div className='w-full max-w-7xl xl:mx-auto'>
            {/* BREADCRUMB */}
            <div className='my-3 mt-5 ml-4 flex items-center gap-2 text-base'>
                {/* <Link className='text-[#338dbc] duration-300 hover:text-cyan-500' to={'/cart/detail'}>
                        Giỏ hàng
                    </Link>
                    &gt; */}
                <Link className='text-[#338dbc] duration-300 hover:text-cyan-500' to={'/'}>
                    Trang chủ
                </Link>
                &gt;
                <span className='text-black'>Đơn hàng Của tôi</span>
            </div>
            <div className='flex flex-col justify-between lg:flex-row'>
                <div className='relative h-[100vh] basis-[25%] p-3'>
                    <h3 className='my-4 text-3xl'>
                        Xin chào, <span className='text-3xl font-bold uppercase'>{username}</span>
                    </h3>
                    <ul>
                        <li>
                            <Link to='/' className='text-sm leading-7'>
                                Thông tin tài khoản
                            </Link>
                        </li>
                        <li>
                            <Link to='/' className='text-sm leading-7'>
                                Quản lý đơn hàng
                            </Link>
                        </li>
                        <li>
                            <Link to='/' className='text-sm leading-7'>
                                Thông tin giao hàng
                            </Link>
                        </li>
                    </ul>
                    <div className='absolute top-[50%] right-0 h-10 w-[1px] translate-y-[-50%] bg-black/20'></div>
                </div>
                <div className='basis-[75%]'>
                    <OrderTable />
                </div>
            </div>
        </div>
    );
};

export default MyOrders;

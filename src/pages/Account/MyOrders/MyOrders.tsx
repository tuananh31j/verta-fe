import { Link } from 'react-router-dom';
import { useTypedSelector } from '~/store/store';
import OrderTable from './Components/OrderTable';

const MyOrders = () => {
    const username = useTypedSelector((state) => state.auth.user?.name);

    return (
        <div className='w-full max-w-7xl xl:mx-auto'>
            <div className='flex flex-col gap-10 lg:flex-row'>
                <div className='relative h-[100vh] basis-[20%] p-3'>
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
                <div className='basis-[80%]'>
                    <OrderTable />
                </div>
            </div>
        </div>
    );
};

export default MyOrders;

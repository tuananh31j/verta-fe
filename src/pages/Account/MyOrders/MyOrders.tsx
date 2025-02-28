import { Link } from 'react-router-dom';
import { useTypedSelector } from '~/store/store';
import OrderTable from './Components/OrderTable';
import BreadcrumbDisplay from '~/components/_common/BreadcrumbDisplay';

const MyOrders = () => {
    const username = useTypedSelector((state) => state.auth.user?.name);

    return (
        <div className='w-full max-w-7xl xl:mx-auto'>
            {/* BREADCRUMB */}
            <BreadcrumbDisplay />

            <div className='flex flex-col justify-between lg:flex-row'>
                <div className='relative h-[100vh] basis-[25%] p-3'>
                    <h3 className='my-4 text-3xl'>
                        Xin chào, <span className='text-3xl font-bold uppercase'>{username}</span>
                    </h3>

                    <ul>
                        <li>
                            <Link to='/account/profile' className='text-sm leading-7'>
                                Thông tin tài khoản
                            </Link>
                        </li>

                        <li>
                            <Link to='/account/my-orders' className='text-sm leading-7'>
                                Quản lý đơn hàng
                            </Link>
                        </li>

                        <li>
                            <Link to='/' className='text-sm leading-7'>
                                Thông tin giao hàng
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className='basis-[75%]'>
                    <OrderTable />
                </div>
            </div>
        </div>
    );
};

export default MyOrders;

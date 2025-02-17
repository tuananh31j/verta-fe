import { Link } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import DropdownUser from '~/layouts/_components/Admin/DropdownUser';

const Header = (props: { sidebarOpen: string | boolean | undefined; setSidebarOpen: (arg0: boolean) => void }) => {
    return (
        <header className='drop-shadow-1 dark:bg-boxdark sticky top-0 z-999 flex w-full bg-white dark:drop-shadow-none'>
            <div className='shadow-2 flex flex-grow items-center justify-between px-4 py-2 md:px-4 2xl:px-4'>
                <div className='flex items-center gap-2 sm:gap-4 lg:hidden'>
                    {/* <!-- Hamburger Toggle BTN --> */}
                    <button
                        aria-controls='sidebar'
                        onClick={(e) => {
                            e.stopPropagation();
                            props.setSidebarOpen(!props.sidebarOpen);
                        }}
                        className='dark:bg-boxdark z-99999 block bg-white p-1.5 shadow-sm lg:hidden'
                    >
                        <MenuOutlined className='fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary' />
                    </button>
                </div>

                <Link className='block flex-shrink-0' to='/'>
                    <span className='text-primary text-2xl font-semibold capitalize'>Morata - </span>
                    <span className='text-black-2 text-2xl font-semibold capitalize dark:text-white'>
                        administrator
                    </span>
                </Link>

                <div className='2xsm:gap-7 flex items-center gap-3'>
                    <ul className='2xsm:gap-4 flex items-center gap-2'>
                        {/* <!-- Dark Mode Toggler --> */}
                        {/* <DarkModeSwitcher /> */}

                        {/* <!-- Notification Menu Area --> */}
                        {/* <DropdownNotification /> */}

                        {/* <!-- Chat Notification Area --> */}
                        {/* <DropdownMessage /> */}
                    </ul>

                    {/* <!-- User Area --> */}
                    <DropdownUser />
                </div>
            </div>
        </header>
    );
};

export default Header;

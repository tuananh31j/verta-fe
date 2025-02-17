import { DownOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import StaticImages from '@/assets';
import ClickOutside from '@/components/_common/ClickOutside';
import ExitIcon from '@/components/_common/Icons/ExitIcon';

const DropdownUser = () => {
    return (
        <ClickOutside onClick={} className='relative'>
            <Link onClick={} className='flex items-center gap-4' to='#'>
                <span className='hidden text-right lg:block'>
                    <span className='block text-sm font-medium text-black dark:text-white'>Hello Admin</span>
                </span>
                <Avatar src={} alt='User' className='h-8 w-8 rounded-full border object-cover' />
                <DownOutlined className='hidden h-4 w-4 fill-current sm:block' />
            </Link>

            {/* <!-- Dropdown Start --> */}
            {/* dropdownOpen && (
                <div
                    className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
                >
                    {/* <ul className='flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark'>
                        <MenuItem />
                    </ul> */}
            {/* <button
                        onClick={() => hangleLogout.mutate()}
                        className='flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base'
                    >
                        <ExitIcon />
                        Đăng xuất
                    </button>
                </div> */}
            {/* )} */}
            {/* <!-- Dropdown End --> */}
        </ClickOutside>
    );
};

export default DropdownUser;

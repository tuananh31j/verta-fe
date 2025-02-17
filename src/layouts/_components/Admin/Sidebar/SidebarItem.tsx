/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useLocation } from 'react-router-dom';
import { IMenuItem } from './_options';
import { FC, useState } from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import { cn } from '~/utils';
import SidebarDropdown from '~/layouts/components/Admin/Sidebar/SidebarDropdown';

export type ISidebarItem = {
    item: IMenuItem;
};

const SidebarItem: FC<ISidebarItem> = ({ item }) => {
    const [isMenuActive, setIsMenuActive] = useState(true);
    const handleClick = () => {
        return setIsMenuActive(!isMenuActive);
    };

    const location = useLocation();

    const isActive = (path: any) => {
        if (path.route === location.pathname) return true;
        if (path.children) {
            return path.children.some((child: any) => isActive(child));
        }
        return false;
    };

    const isItemActive = isActive(item);

    return (
        <>
            <li>
                <span
                    onClick={handleClick}
                    className={`${isItemActive ? 'bg-graydark dark:bg-meta-4' : ''} group text-bodydark1 hover:bg-graydark dark:hover:bg-meta-4 relative flex gap-2.5 rounded-sm px-4 py-2 text-[13px] font-thin capitalize duration-300 ease-in-out`}
                >
                    <div className='flex w-full gap-2'>
                        {item.icon}
                        {item.children || !item.route ? (
                            item.label
                        ) : (
                            <NavLink className='w-full' to={item.route}>
                                {item.label}
                            </NavLink>
                        )}
                    </div>
                    {item.children && (
                        <CaretDownOutlined
                            className={`absolute top-1/2 right-4 -translate-y-1/2 fill-current ${
                                isMenuActive && 'rotate-180'
                            }`}
                        />
                    )}
                </span>

                {item.children && (
                    <div className={cn('translate transform', { ['hidden']: !isMenuActive })}>
                        <SidebarDropdown item={item.children} />
                    </div>
                )}
            </li>
        </>
    );
};

export default SidebarItem;

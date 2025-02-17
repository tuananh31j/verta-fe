import { NavLink } from 'react-router-dom';
import { IChildrenItem } from './_options';

const SidebarDropdown = ({ item }: { item: IChildrenItem[] }) => {
    return (
        <>
            <ul className='mt-4 mb-5.5 flex flex-col gap-2.5 pl-6'>
                {item.map((menuItem, index) => (
                    <li key={index}>
                        <NavLink
                            end
                            to={menuItem.route}
                            className={({ isActive }) => {
                                const classActive = isActive ? 'text-blue-700' : '';
                                return `group flex items-center gap-2.5 rounded-md px-4 text-[12px] font-thin text-white duration-300 ease-in-out hover:text-blue-700 ${classActive}`;
                            }}
                        >
                            {menuItem.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default SidebarDropdown;

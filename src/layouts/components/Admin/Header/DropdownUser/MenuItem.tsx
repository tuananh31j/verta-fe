import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { MAIN_ROUTES } from '@/constants/router';

const MenuItem = () => {
    return (
        <li>
            <Link
                to={'#'}
                className='hover:text-primary flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out lg:text-base'
            >
                <UserOutlined className='fill-current' />
                My Profile
            </Link>
        </li>
    );
};

export default MenuItem;

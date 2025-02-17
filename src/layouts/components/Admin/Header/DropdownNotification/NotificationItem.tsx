import { Link } from 'react-router-dom';

const NotificationItem = () => {
    return (
        <li>
            <Link
                className='border-stroke hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 flex flex-col gap-2.5 border-t px-4.5 py-3'
                to='#'
            >
                <p className='text-sm'>
                    <span className='text-black dark:text-white'>Edit your information in a swipe</span> Sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.
                </p>

                <p className='text-xs'>12 May, 2025</p>
            </Link>
        </li>
    );
};

export default NotificationItem;

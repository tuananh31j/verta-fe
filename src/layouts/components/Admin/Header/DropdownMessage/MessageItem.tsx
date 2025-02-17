import { Link } from 'react-router-dom';
import StaticImages from '@/assets';

const MessageItem = () => {
    return (
        <li>
            <Link
                className='border-stroke hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4 flex gap-4.5 border-t px-4.5 py-3'
                to='/messages'
            >
                <div className='h-12.5 w-12.5 rounded-full'>
                    <img
                        src={StaticImages.userImageDf}
                        alt='User'
                        className='h-10 w-10 rounded-full border object-cover'
                    />
                </div>

                <div>
                    <h6 className='text-sm font-medium text-black dark:text-white'>Mariya Desoja</h6>
                    <p className='text-boxdark-2 w-39 truncate text-sm dark:text-white'>I like your confidence 💪</p>
                    <p className='text-xs'>2min ago</p>
                </div>
            </Link>
        </li>
    );
};

export default MessageItem;

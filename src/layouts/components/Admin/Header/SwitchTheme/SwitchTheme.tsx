import MoonIcon from '@/components/_common/Icons/MoonIcon';
import SunIcon from '@/components/_common/Icons/SunIcon';
import useColorMode from '@/hooks/_common/useColorMode';

const DarkModeSwitcher = () => {
    const [colorMode, setColorMode] = useColorMode();
    return (
        <li>
            <label htmlFor='dark-mode-switch' className={`relative m-0 mr-9 block h-7.5 rounded-full`}>
                <input
                    id='dark-mode-switch'
                    type='checkbox'
                    checked={colorMode === 'dark'}
                    onChange={() => {
                        if (typeof setColorMode === 'function') {
                            setColorMode(colorMode === 'light' ? 'dark' : 'light');
                        }
                    }}
                    className='absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0 duration-200'
                />
                <span
                    className={`shadow-switcher absolute top-1/2 left-[3px] flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white duration-75 ease-linear ${
                        colorMode === 'dark' && '!right-[3px] !translate-x-full'
                    }`}
                >
                    <span className='dark:hidden'>
                        <SunIcon />
                    </span>
                    <span className='hidden dark:inline-block'>
                        <MoonIcon />
                    </span>
                </span>
            </label>
        </li>
    );
};

export default DarkModeSwitcher;

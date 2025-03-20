import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import HeaderTop from './Header/HeaderTop';
import { useEffect, useState } from 'react';
import useGetProfile from '~/hooks/queries/profile/useGetProfile';
import { months } from 'moment';

export default function MainLayout() {
    const [paddingTopSticky, setPaddingTopSticky] = useState(0);
    const { data } = useGetProfile();
    const dateInMillis = data?.userIsOldWhen ? new Date(data?.userIsOldWhen).getTime() : 0;

    const nowInMillis = new Date().getTime();
    const isNewUser = dateInMillis > nowInMillis;
    console.log(data);

    useEffect(() => {
        // ui doi oi de vai l*n
        const handleScroll = () => {
            const srollTop = window.scrollY || document.documentElement.scrollTop;
            if (srollTop <= 36) {
                setPaddingTopSticky(screenTop);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <>
            <HeaderTop />
            <Header />
            <main className={`pt-[${paddingTopSticky}] min-h-[60vh] duration-300`}>
                <Outlet />
            </main>
            {isNewUser && (
                <div className='fixed right-0 bottom-0 z-50 flex max-w-[200px] flex-col items-center justify-center rounded-tl-3xl border-2 bg-red-900 p-4 shadow-lg'>
                    <img src='/sale-icon.png' alt='' className='h-15 w-15' />
                    <p className='sparkle-text text-[20px] font-extrabold text-white'>Khách hàng mới!</p>
                </div>
            )}

            <Footer />
        </>
    );
}

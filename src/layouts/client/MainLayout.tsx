import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import HeaderTop from './Header/HeaderTop';
import { useEffect, useState } from 'react';

export default function MainLayout() {
    const [paddingTopSticky, setPaddingTopSticky] = useState(0);

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
            <Footer />
        </>
    );
}

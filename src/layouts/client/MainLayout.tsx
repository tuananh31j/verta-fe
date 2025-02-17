import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import HeaderTop from './Header/HeaderTop';
import { useEffect, useState } from 'react';

export default function MainLayout() {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 36);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <>
            <HeaderTop />
            <Header />
            <main className={`${isSticky ? 'mt-[3%]' : ''} min-h-[60vh] duration-300`}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

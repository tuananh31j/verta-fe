import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AutoScrollToTop = ({ children }: { children: React.ReactNode }) => {
    const path = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [path]);
    return <>{children}</>;
};

export default AutoScrollToTop;

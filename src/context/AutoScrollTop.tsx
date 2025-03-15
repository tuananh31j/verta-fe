import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { SCROLL_TO } from '~/constants/ScrollTo';
import { resetScrollTo } from '~/store/slice/scrollToTopSlice';
import { useTypedSelector } from '~/store/store';

const AutoScrollToTop = ({ children }: { children: React.ReactNode }) => {
    const path = useLocation();
    const dispatch = useDispatch();
    const scrollTo = useTypedSelector((state) => state.scollToTop.scrollType);

    useEffect(() => {
        if (scrollTo === 'reviews') {
            window.scrollTo({ top: SCROLL_TO.REVIEWS, left: 0, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
        return () => {
            dispatch(resetScrollTo());
        };
    }, [path]);
    return <>{children}</>;
};

export default AutoScrollToTop;

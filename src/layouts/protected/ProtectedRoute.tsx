import { useTypedSelector } from '~/store/store';
import { Navigate } from 'react-router';
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const isAuth = useTypedSelector((state) => state.auth.authenticate);
    const user = useTypedSelector((state) => state.auth.user);
    if (!isAuth || !user) {
        console.log('Redirecting because isAuth:', isAuth, 'user:', user);
        return <Navigate to='/' replace />;
    }

    const isAdmin = user.role === 'admin';

    if (!isAdmin) {
        console.log('Redirecting because isAdmin:', isAdmin);
        return <Navigate to='/' replace />;
    }

    return children;
}

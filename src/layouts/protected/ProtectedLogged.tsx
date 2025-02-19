import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTypedSelector } from '~/store/store';

export default function ProtectedLogged({ children, type }: { children: React.ReactNode; type: 'LOGGED' | 'NOTLOG' }) {
    const user = useTypedSelector((state) => state.auth.user);
    if (user && type === 'LOGGED') {
        return <Navigate to={'/'} />;
    }
    if (!user && type === 'NOTLOG') {
        return <Navigate to={'/'} />;
    }
    return children;
}

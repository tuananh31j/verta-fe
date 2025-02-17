import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTypedSelector } from '~/store/store';

export default function ProtectedLogged({ children }: { children: React.ReactNode }) {
    const user = useTypedSelector((state) => state.auth.user);

    if (!user) {
        return <Navigate to={'/'} />;
    }
    return children;
}

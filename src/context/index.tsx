import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import QueryProvider from './QueryProvider';
import ReduxProvider from './ReduxProvider';

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <BrowserRouter>
                <ReduxProvider>
                    <QueryProvider>{children}</QueryProvider>
                </ReduxProvider>
            </BrowserRouter>
        </>
    );
}

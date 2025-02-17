import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import QueryProvider from './QueryProvider';
import ReduxProvider from './ReduxProvider';
import { ToastProvider } from './ToastProvider';
import AutoScrollToTop from './AutoScrollTop';

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <>
            <BrowserRouter>
                <ToastProvider>
                    <ReduxProvider>
                        <QueryProvider>
                            <AutoScrollToTop>{children}</AutoScrollToTop>
                        </QueryProvider>
                    </ReduxProvider>
                </ToastProvider>
            </BrowserRouter>
        </>
    );
}

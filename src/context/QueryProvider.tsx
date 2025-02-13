import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { envProcess } from '~/constants/env';

const queryClient = new QueryClient();
const QueryProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {envProcess.env === 'development' && <ReactQueryDevtools />}
            {children}
        </QueryClientProvider>
    );
};

export default QueryProvider;

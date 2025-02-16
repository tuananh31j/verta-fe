import ErrorPage from '~/pages/Error/ErrorPage';
import MainLayout from '../layouts/client/MainLayout';
import { AuthPage, HomePage, Suspense } from './LazyRoutes';

const PublicRoutes = [
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: (
                    <Suspense>
                        <HomePage />
                    </Suspense>
                ),
            },
            {
                path: '/auth',
                element: (
                    <Suspense>
                        <AuthPage />
                    </Suspense>
                ),
            },
        ],
    },
];

export default PublicRoutes;

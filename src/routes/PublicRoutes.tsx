import ErrorPage from '~/pages/Error/ErrorPage';
import MainLayout from '../layouts/client/MainLayout';
import { AuthPage, HomePage, ProductDetailPage, Suspense, VerifyAccountPage } from './LazyRoutes';
import ProtectedLogged from '~/layouts/protected/ProtectedLogged';
import { Navigate } from 'react-router-dom';
import NotFoundPage from '~/pages/NotFound/NotFoundPage';

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
                path: '/product/:id',
                element: (
                    <Suspense>
                        <ProductDetailPage />
                    </Suspense>
                ),
            },
            {
                path: '/auth',
                element: (
                    <Suspense>
                        <ProtectedLogged>
                            <AuthPage />
                        </ProtectedLogged>
                    </Suspense>
                ),
            },
            {
                path: '/verifyAccount',
                element: (
                    <Suspense>
                        <ProtectedLogged>
                            <VerifyAccountPage />
                        </ProtectedLogged>
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to={'/404'} />,
    },
    {
        path: '/404',
        element: <NotFoundPage />,
    },
];

export default PublicRoutes;

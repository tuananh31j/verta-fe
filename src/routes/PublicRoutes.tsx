import ErrorPage from '~/pages/Error/ErrorPage';
import MainLayout from '../layouts/client/MainLayout';
import {
    AuthPage,
    CartDetail,
    HomePage,
    ProductDetailPage,
    ShippingAddressPage,
    Suspense,
    VerifyAccountPage,
} from './LazyRoutes';
import ProtectedLogged from '~/layouts/protected/ProtectedLogged';
import { Navigate } from 'react-router-dom';
import NotFoundPage from '~/pages/NotFound/NotFoundPage';
import CheckoutLayout from '~/layouts/checkout/CheckoutLayout';

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
                        <ProtectedLogged type='LOGGED'>
                            <AuthPage />
                        </ProtectedLogged>
                    </Suspense>
                ),
            },
            {
                path: '/verifyAccount',
                element: (
                    <Suspense>
                        <ProtectedLogged type='LOGGED'>
                            <VerifyAccountPage />
                        </ProtectedLogged>
                    </Suspense>
                ),
            },
            {
                path: '/cart/detail',
                element: (
                    <Suspense>
                        <ProtectedLogged type='NOTLOG'>
                            <CartDetail />
                        </ProtectedLogged>
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: '/checkout',
        element: (
            <ProtectedLogged type='NOTLOG'>
                <CheckoutLayout />
            </ProtectedLogged>
        ),
        children: [
            {
                path: '',
                element: (
                    <Suspense>
                        <ShippingAddressPage />
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

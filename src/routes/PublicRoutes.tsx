import { Navigate } from 'react-router-dom';
import ProtectedLogged from '~/layouts/protected/ProtectedLogged';
import ErrorPage from '~/pages/Error/ErrorPage';
import NotFoundPage from '~/pages/NotFound/NotFoundPage';
import MainLayout from '../layouts/client/MainLayout';
import {
    AuthPage,
    CartDetail,
    HomePage,
    MyOrders,
    ProductDetailPage,
    Profile,
    Suspense,
    VerifyAccountPage,
} from './LazyRoutes';

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
                        <AuthPage />
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
            {
                path: '/cart/detail',
                element: (
                    <Suspense>
                        <ProtectedLogged>
                            <CartDetail />
                        </ProtectedLogged>
                    </Suspense>
                ),
            },
            {
                path: '/account/profile',
                element: (
                    <Suspense>
                        <ProtectedLogged>
                            <Profile />
                        </ProtectedLogged>
                    </Suspense>
                ),
            },
            {
                path: '/account/my-orders',
                element: (
                    <Suspense>
                        <ProtectedLogged>
                            <MyOrders />
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

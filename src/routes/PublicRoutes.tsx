import ErrorPage from '~/pages/Error/ErrorPage';
import MainLayout from '../layouts/client/MainLayout';

import { Navigate } from 'react-router-dom';
import ProtectedLogged from '~/layouts/protected/ProtectedLogged';
import NotFoundPage from '~/pages/NotFound/NotFoundPage';
import {
    AuthPage,
    CartDetail,
    HomePage,
    MyDetailOrder,
    MyOrders,
    PaymentPage,
    ProductDetailPage,
    Profile,
    ShippingAddressPage,
    Suspense,
    VerifyAccountPage,
} from './LazyRoutes';
import CheckoutLayout from '~/layouts/checkout/CheckoutLayout';
import OrderSuccessPage from '~/pages/Checkout/OrderSuccessPage';
import OrderErrorPage from '~/pages/Checkout/OrderErrrorPage';

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
            {
                path: '/account/profile',
                element: (
                    <Suspense>
                        <ProtectedLogged type='NOTLOG'>
                            <Profile />
                        </ProtectedLogged>
                    </Suspense>
                ),
            },
            {
                path: '/account/my-orders',
                element: (
                    <Suspense>
                        <ProtectedLogged type='NOTLOG'>
                            <MyOrders />
                        </ProtectedLogged>
                    </Suspense>
                ),
            },
            {
                path: '/account/my-orders/:id',
                element: (
                    <Suspense>
                        <ProtectedLogged type='NOTLOG'>
                            <MyDetailOrder />
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
            {
                path: 'payment',
                element: (
                    <Suspense>
                        <PaymentPage />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: '/order/success/:id',
        element: <OrderSuccessPage />,
    },
    {
        path: '/order/error/:orderId',
        element: <OrderErrorPage />,
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

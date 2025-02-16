import ErrorPage from '~/pages/Error/ErrorPage';
import MainLayout from '../layouts/client/MainLayout';
import { HomePage, MyOrdersPage, ProfilePage, Suspense } from './LazyRoutes';
import AccountLayout from '~/layouts/client/AccountLayout';
import { MAIN_ROUTES } from '~/constants/router';

const PublicRoutes = [
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            // HOMEPAGE
            {
                path: '',
                element: (
                    <Suspense>
                        <HomePage />
                    </Suspense>
                ),
            },

            // ACCOUNT PAGE
            {
                path: MAIN_ROUTES.ACCOUNT,
                element: (
                    <Suspense>
                        <AccountLayout />
                    </Suspense>
                ),
                children: [
                    { path: MAIN_ROUTES.PROFILE, element: <ProfilePage /> },
                    { path: MAIN_ROUTES.MY_ORDERS, element: <MyOrdersPage /> },
                    // { path: MAIN_ROUTES.MY_ORDERS_DETAIL, element: <OrderDetailPage /> },
                ],
            },
        ],
    },
];

export default PublicRoutes;

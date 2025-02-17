import ErrorPage from '~/pages/Error/ErrorPage';
import MainLayout from '../layouts/client/MainLayout';
import { AuthPage, HomePage, Suspense, VerifyAccountPage } from './LazyRoutes';
import ProtectedLogged from '~/layouts/protected/ProtectedLogged';

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
];

export default PublicRoutes;

import ErrorPage from '~/pages/Error/ErrorPage';
import MainLayout from '../layouts/client/MainLayout';
import { HomePage, Suspense } from './LazyRoutes';

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
        ],
    },
];

export default PublicRoutes;

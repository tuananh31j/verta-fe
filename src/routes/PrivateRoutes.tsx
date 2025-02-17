import AdminLayout from '../layouts/Admin';
import { Suspense } from './LazyRoutes';
import { ADMIN_ROUTES } from '~/constants/router';
import { Outlet } from 'react-router-dom';
export const PrivateRoutes = [
    {
        path: ADMIN_ROUTES.DASHBOARD,
        element: (
            //       <ProtectedRoute>
            <AdminLayout />
            //         </ProtectedRoute>
        ),
    },
];

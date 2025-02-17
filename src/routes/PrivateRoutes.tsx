import { CreateProduct, ProductsList, Suspense } from '~/routes/LazyRoutes';
import AdminLayout from '../layouts/Admin';
import { ADMIN_ROUTES } from '~/constants/router';
export const PrivateRoutes = [
    {
        path: ADMIN_ROUTES.DASHBOARD,
        element: (
            //       <ProtectedRoute>
            <AdminLayout />
            //         </ProtectedRoute>
        ),
        children:[
            { path: ADMIN_ROUTES.PRODUCTS, element: <Suspense><ProductsList/></Suspense> },
            { path: ADMIN_ROUTES.PRODUCTS_CREATE, element: <Suspense><CreateProduct/></Suspense> },
        ]
    },
];

import AdminLayout from '../layouts/Admin';
import {
    ColorList,
    CreateColor,
    CreateProduct,
    CreateSize,
    DashboardPage,
    ProductsList,
    SizeList,
    Suspense,
    UpdateColor,
    UpdateProduct,
    UpdateSize,
} from './LazyRoutes';
import { ADMIN_ROUTES } from '~/constants/router';
import { Outlet } from 'react-router-dom';
export const PrivateRoutes = [
    {
        path: ADMIN_ROUTES.DASHBOARD,
        element: <AdminLayout />,
        children: [
            { path: ADMIN_ROUTES.PRODUCTS, element: <Suspense><ProductsList/></Suspense> },
            { path: ADMIN_ROUTES.PRODUCTS_CREATE, element: <Suspense><CreateProduct/></Suspense> },
            { path: ADMIN_ROUTES.PRODUCTS_EDIT + '/:productId', element: <Suspense><UpdateProduct/></Suspense> },
            { index: true,element: <Suspense><DashboardPage /></Suspense>,  },
            // @Color
            { path: ADMIN_ROUTES.COLORS, element: <Suspense><Outlet /> </Suspense>,
                children: [
                    { index: true, element:  <Suspense><ColorList /></Suspense>,},
                    { path: 'list', element:  <Suspense><ColorList /></Suspense>,},
                    { path: 'create', element:  <Suspense><CreateColor /></Suspense>,},
                    { path: 'edit/:id', element:  <Suspense><UpdateColor /></Suspense>,},
                ],
            },
            // @Size
            { path: ADMIN_ROUTES.SIZES, element: <Suspense><Outlet /></Suspense>,
                children: [
                    { index: true, element: <Suspense><SizeList /></Suspense>,},
                    { path: 'list', element: <Suspense><SizeList /></Suspense>,},
                    { path: 'create', element: <Suspense><CreateSize /></Suspense>,},
                    { path: 'edit/:id', element: <Suspense><UpdateSize /></Suspense>,
                    },
                ],
            },
        ],
    },
];

import AdminLayout from '../layouts/Admin';
import {
    CategoryList,
    ColorList,
    CreateCategory,
    CreateColor,
    CreateProduct,
    CreateSize,
    DashboardPage,
    ManageOrders,
    OrdersDetails,
    ProductsList,
    SizeList,
    Suspense,
    UpdateCategory,
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
            // @Product
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

            // @Category
            {
                path: ADMIN_ROUTES.CATEGORIES, element: <Suspense><Outlet /></Suspense>,
                children: [
                    { index: true, element: <Suspense><CategoryList /></Suspense>},
                    { path: 'list', element: <Suspense><CategoryList /></Suspense>},
                    { path: 'create', element: <Suspense><CreateCategory /></Suspense>},
                    { path: 'edit/:id', element: <Suspense><UpdateCategory /></Suspense>,},
                ]
            },
            // @Order-List
             {
                path: ADMIN_ROUTES.ORDERS,
                element: (
                    <Suspense>
                        <ManageOrders />
                    </Suspense>
                ),
            },
            // @Order-detail
              {
                path: `${ADMIN_ROUTES.ORDERS}/:id/detail`,
                element: (
                    <Suspense>
                        <OrdersDetails />
                    </Suspense>
                ),
            },
        ],
    },
];

import AdminLayout from '~/layouts/Admin';
import {
    CategoryList,
    ColorList,
    CreateCategory,
    CreateColor,
    CreateProduct,
    CreateSize,
    DashboardPage,
    FormVoucher,
    ManageOrders,
    OrdersDetails,
    ProductsList,
    ReviewList,
    SizeList,
    Suspense,
    UpdateCategory,
    UpdateColor,
    UpdateProduct,
    UpdateSize,
    UserList,
    VoucherList,
} from './LazyRoutes';
import { ADMIN_ROUTES } from '~/constants/router';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from '~/layouts/protected/ProtectedRoute';
export const PrivateRoutes = [
    {
        path: ADMIN_ROUTES.DASHBOARD,
        element: (
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            // @Product
            { path: ADMIN_ROUTES.PRODUCTS, element: <Suspense><ProductsList/></Suspense> },
            { path: ADMIN_ROUTES.PRODUCTS_CREATE, element: <Suspense><CreateProduct/></Suspense> },
            { path: ADMIN_ROUTES.PRODUCTS_EDIT + '/:productId', element: <Suspense><UpdateProduct/></Suspense> },
            { index: true,element: <Suspense><DashboardPage /></Suspense>,  },

            // @Voucher
            { path: ADMIN_ROUTES.VOUCHER, element: <Suspense><Outlet /> </Suspense>,
                children: [
                    { index: true, element:  <Suspense><VoucherList /></Suspense>,},
                    { path: ADMIN_ROUTES.VOUCHER, element:  <Suspense><VoucherList /></Suspense>,},
                    { path: ADMIN_ROUTES.VOUCHER_CREATE, element:  <Suspense><FormVoucher /></Suspense>,},
                    { path: `${ADMIN_ROUTES.VOUCHER_EDIT}/:id`, element:  <Suspense><FormVoucher /></Suspense>,},
                ],
            },
            // @Color
            { path: ADMIN_ROUTES.COLORS, element: <Suspense><Outlet /> </Suspense>,
                children: [
                    { index: true, element:  <Suspense><ColorList /></Suspense>,},
                    { path: 'list', element:  <Suspense><ColorList /></Suspense>,},
                    { path: 'create', element:  <Suspense><CreateColor /></Suspense>,},
                    { path: 'edit/:id', element:  <Suspense><UpdateColor /></Suspense>,},
                ],
            },

            // @User 
            { path: ADMIN_ROUTES.USERS, element: <Suspense><Outlet /> </Suspense>,
                children: [
                    { index: true, element:  <Suspense><UserList /></Suspense>,},
                    { path: 'list', element:  <Suspense><UserList /></Suspense>,},
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
            // @Reviews
            {
                path: ADMIN_ROUTES.REVIEWS, element: <Suspense><Outlet /></Suspense>,
                children: [
                    { index: true, element: <Suspense><ReviewList /></Suspense>},
                    { path: 'list', element: <Suspense><ReviewList /></Suspense>},
                    { path: 'edit/:id', element: <Suspense><ReviewList /></Suspense>,},
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

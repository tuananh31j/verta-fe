export const MAIN_ROUTES = {
    // ACCOUNT PAGE
    ACCOUNT: '/account',
    PROFILE: '/account/profile',
    MY_ORDERS: 'account/my-orders',
    MY_ORDER_DETAILS: 'account/my-orders/:id',
};
export const ADMIN_ROUTES = {
    DASHBOARD: '/admin',
    SIZES: '/admin/sizes',
    SIZE_CREATE: '/admin/sizes/create',
    SIZE_EDIT: '/admin/sizes/edit', // @id

    COLORS: '/admin/colors',
    COLOR_CREATE: '/admin/colors/create',
    COLOR_EDIT: '/admin/colors/edit', // @id

    // SHOP
    SHOP: '/admin/shop',
    SHOP_SETTINGS: '/admin/shop',
};

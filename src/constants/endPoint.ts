export const PRODUCT_ENDPOINT = {
    PRODUCT: '/products',
    DETAILED_VARIANT: '/variantDetail',
    TRENING: '/products/top-sold',
    ALL: '/products/all',
    ALL_ADMIN: '/products/portal/all',
    LATEST: '/products/latest',
    DEALS: '/products/deals',
    REVIEWS: '/products/reviews',
    REVIEWS_DETAIL: '/products/reviewsdd',
    RELATED: '/products/related',
    CREATE: '/products',
    DELETE: '/products',
    UPDATE: '/products',
    UPDATE_VARIATIONS: '/products/variation/',
    CREATE_VARIATIONS: '/products/variation/',
    FILTER: '/products/filter',
    HIDE: '/products/hide', // @productId
    SHOW: '/products/show', // @productId
};
export const CATEGORY_ENDPOINT = {
    ALL: '/categories/all',
    MENU: '/categories/menu',
    POPULAR: '/categories/popular',
    CREATE: '/categories',
    DETAIL: '/categories',
    UPDATE: '/categories',
};
export const CART_ENDPOINT = {
    GET: '/carts',
    ADDCART: '/carts/add',
    UPDATEQUANTITY: '/carts/update-quantity',
    REMOVEITEM: '/carts/remove-item',
};

export const SIZE_ENDPOINT = {
    ALL: '/sizes/all',
    DETAIL: '/sizes',
    CREATE: '/sizes',
    UPDATE: '/sizes',
};
export const COLOR_ENDPOINT = {
    ALL: '/colors/all',
    DETAIL: '/colors',
    CREATE: '/colors',
    UPDATE: '/colors',
};
export const TAG_ENDPOINT = {
    ALL: '/tags/all',
    DETAIL: '/tags',
    CREATE: '/tags',
    UPDATE: '/tags',
};
export const AUTH_ENDPOINT = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    SENDMAIL: '/auth/sendVerify',
    VERIFY: '/auth/verifyEmail',
    RESETPASSWORD: '/auth/resetPassword',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
};

export const CHECKOUT_ENDPOINT = {
    ORDERS: '/orders',
    VNPAY: '/create-checkout-with-vnpay',
    SESSION: '/create-checkout-session',
};

export const ORDER_ENDPOINT = {
    GET_ALL_ORDERS: '/orders/my-orders',
    GET_DETAIL_ORDER: '/orders',
    // MY_ORDERS: '/orders/user',
    VNPAY_RETURN: '/vnpay-return',
    MY_ORDERS: 'orders/my-order',
    CANCEL_ORDER: '/orders/cancel',
    CONFIRM_ORDER: '/orders/confirm',
    SHIPPING_ORDER: '/orders/shipping',
    DELIVERED_ORDER: '/orders/delivered',
    FINISH_ORDER: '/orders/done',
    CREATE_ORDER: '/orders/create',
    DISABLED_REVIEW: '/orders/disabled-review',
};

export const STATS_ENDPOINT = {
    TOTAL: '/stats/total',
    DAILY_STATS: '/stats/daily',
    MONTHLY_STATS: '/stats/monthly',
    YEARLY_STATS: '/stats/yearly',
    DATE_RANGE: 'stats/dateRange',
    PRODUCTS: '/stats/productStats',
    TOP_BUYERS: '/stats/topBuyers',
};

export const USER_ENDPOINT = {
    PROFILE: '/users/profile',
    ALL: '/users/all',
    UPDATE: '/users',
    CHANGE_PASSWORD: '/users/changePassword',
    UPDATE_ADMIN: '/users',
    DETAIL: '/users',
};
export const REVIEW_ENDPOINT = {
    GETOFPRODUCT: '/reviews',
    GET_DETAIL: '/reviews',
    GET_ALL: '/reviews/all',
    CREATE: '/reviews',
    STARS_REVIEW: '/reviews/stars-review',
    DELETE_REVIEW: '/reviews/',
    CHECK_PURCHASED: '/reviews/purchased',
    UPDATE_ISREVIEWED: '/reviews/',
};
export const LOCATION_ENDPOINT = {
    ROOT: '/locations',
    USER: '/locations/user',
};
export const WISHLIST_ENDPOINT = {
    MY_WISHLIST: '/users/private/wish-list',
    ADD_WISHLIST: '/users/private/wish-list/add',
    REMOVE_WISHLIST: '/users/private/wish-list/remove',
};

export const SHIPPING_ENDPOINT = {
    PROVINCES: 'shipping/get-province',
    DISTRICT: 'shipping/get-district',
    WARD: 'shipping/get-ward',
};
export const ORDER_ENDPONT = {
    CREATEORDERCOD: 'orders/create-order',
    MYORDER: 'orders/my-orders',
};

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
};
export const CATEGORY_ENDPOINT = {};
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
export const AUTH_ENDPOINT = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    SENDMAIL: '/auth/sendVerify',
    VERIFY: '/auth/verifyEmail',
    RESETPASSWORD: '/auth/resetPassword',
    LOGOUT: '/auth/logout',
};

export const ORDER_ENDPOINT = {
    GET_ALL_ORDERS: '/orders',
    MY_ORDERS: 'orders/my-order',
    CANCEL_ORDER: '/orders/cancel',
    CONFIRM_ORDER: '/orders/confirm',
    SHIPPING_ORDER: '/orders/shipping',
    DELIVERED_ORDER: '/orders/delivered',
    FINISH_ORDER: '/orders/done',
    CREATE_ORDER: '/orders/create',
    DISABLED_REVIEW: '/orders/disabled-review',
};

export const STATS_ENDPOINT = {};

export const USER_ENDPOINT = {
    PROFILE: '/users/profile',
    ALL: '/users/all',
    UPDATE: '/users',
    CHANGE_PASSWORD: '/users/changePassword',
    DETAIL: '/users',
};
export const REVIEW_ENDPOINT = {};
export const LOCATION_ENDPOINT = {
    ROOT: '/locations',
    USER: '/locations/user',
};
export const WISHLIST_ENDPOINT = {};

export const SHIPPING_ENDPOINT = {
    PROVINCES: 'shipping/get-province',
    DISTRICT: 'shipping/get-district',
    WARD: 'shipping/get-ward',
};
export const ORDER_ENDPONT = {
    CREATEORDERCOD: 'orders/create-order',
    MYORDER: 'orders/my-orders',
};

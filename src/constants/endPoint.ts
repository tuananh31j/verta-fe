export const PRODUCT_ENDPOINT = {
    PRODUCT: '/products',
    DETAILED_VARIANT: '/variantDetail',
    TRENING: '/products/top-sold',
    ALL: '/products/all',
    RELATED: '/products/related',
};

export const CART_ENDPOINT = {
    GET_ALL: 'carts',
    ADD_CART: 'carts/add',
    UPDATE_CART: 'carts/update-quantity',
    REMOVE_ITEM: 'carts',
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
    AUTH: '/auth',
};

export const CHECKOUT_ENDPOINT = {
    ORDERS: '/orders/create-order',
};

export const STATS_ENDPOINT = {};

export const SHIPPING_ENDPOINT = {
    PROVINCES: 'shipping/get-province',
    DISTRICT: 'shipping/get-district',
    WARD: 'shipping/get-ward',
};
export const ORDER_ENDPOINT = {
    CREATEORDERCOD: 'orders/create-order',
    MYORDER: 'orders/my-orders',
    CREATE_ORDER_PAYOS: 'payos/create',
};
export const INVENTORY_ENDPOINT = {
    UPDATE_STOCK_ON_CANCEL_ORDER: 'payos/update-stock/cancel',
};

export const USER_ENDPOINT = {
    PROFILE: 'user/private',
};

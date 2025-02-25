import { PaymentMethod } from '~/constants/enum';

interface CustomerInfo {
    name: string;
    email: string;
    phone: string;
}
interface ShippingAddress {
    country: string;
    province: string;
    district: string;
    address: string;
    ward: string;
}

// PAYLOAD
interface ProductItem {
    productId: string;
    variantId: string;
    name: string;
    size: string;
    color: string;
    category: string;
    quantity: number;
    price: number;
    image: string;
}
export interface IOrderCreatePayload {
    items: ProductItem[];
    totalPrice: number;
    shippingFee: number;
    customerInfo: CustomerInfo;
    shippingAddress: ShippingAddress;
    description?: string;
}
export interface IOrderPayOsPayLoad extends IOrderCreatePayload {
    amount: number;
    returnUrl: string;
    cancelUrl: string;
    paymentMethod: PaymentMethod;
}
export interface IOrderPayosReponse {
    checkoutUrl: string;
}
export type IOrderItem = {
    name: string;
    quantity: number;
    price: number;
    image: string;
};
// RESPONSE
interface OrderItem {
    productId: string;
    variantId: string;
    name: string;
    size: string;
    color: string;
    category: string;
    quantity: number;
    price: number;
    image: string;
    isReviewed: boolean;
    isReviewDisabled: boolean;
}

export interface IOrder {
    userId: string;
    items: OrderItem[];
    totalPrice: number;
    shippingFee: number;
    customerInfo: CustomerInfo;
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    isPaid: boolean;
    canceledBy: string;
    description: string;
    orderStatus: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IOrderResponse {
    orders: IOrder[];
    page: number;
    totalDocs: number;
    totalPages: number;
}

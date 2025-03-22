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
export interface ProductItem {
    id: string;
    productId: string;
    variantId: string;
    stock?: number;
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
    voucherCode: string | null;
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
export interface OrderItem {
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
    orderCode: number;
    items: OrderItem[];
    totalPrice: number;
    shippingFee: number;
    customerInfo: CustomerInfo;
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    discountType: string;
    voucherDiscount: number;
    voucherName: string;
    voucherCode: string;
    isPaid: boolean;
    canceledBy: string;
    description: string;
    orderStatus: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

interface IUser {
    _id: string;
    name: string;
    email: string;
}

export interface HistoryOrder {
    status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
    updatedBy: IUser;
    updatedByName: string;
    updatedByRole: string;
    description: string;
    updatedAt: string;
}
export interface IHistoryOrder extends Array<HistoryOrder> {}

export interface IOrderResponse {
    orders: IOrder[];
    page: number;
    totalDocs: number;
    totalPages: number;
}

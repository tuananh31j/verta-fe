import { OrderStatus, PaymentMethod } from '../constants/enum';

export type IShippingAddress = {
    city: string;
    country: string;
    line1: string;
    line2: string;
    postal_code: string;
    state: string;
};
export type ICustomerInfo = {
    name: string;
    email: string;
    phone: string;
};

export type IOrderItem = {
    name: string;
    quantity: number;
    price: number;
    image: string;
};
export type IOrderDetails = {
    receiverInfo: {
        name: string;
        email: string;
        phone: string;
    };
    note?: string;
    shippingAddress: IShippingAddress;
    _id: string;
    userId: string;
    items: IOrderItem[];
    totalPrice: number;
    tax: number;
    shippingFee: number;
    paymentMethod: PaymentMethod;
    isPaid: boolean;
    currentOrderStatus: OrderStatus;
    orderStatusLogs: Array<{
        orderStatus: OrderStatus;
        reason: string;
        _id: string;
        createdAt: string;
    }>;
    createdAt: string;
};

export interface IOrderResponse {
    orders: Array<{
        _id: string;
        totalPrice: number;
        paymentMethod: PaymentMethod;
        isPaid: boolean;
        currentOrderStatus: OrderStatus;
        createdAt: string;
    }>;
    page: number;
    totalDocs: number;
    totalPages: number;
}

export type IOrderParams = {
    orderStatus: string[] | null;
    isPaid: string[] | null;
    paymentMethod: string[] | null;
};

export type IOrderHead = {
    _id: string;
    name: string;
    totalPrice: number;
    paymentMethod: string;
    orderStatus: OrderStatus;
    isPaid: boolean;
    createdAt: string;
};

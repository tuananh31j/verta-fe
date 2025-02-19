export enum OrderStatus {
    pending = 'pending',
    cancelled = 'cancelled',
    confirmed = 'confirmed',
    shipping = 'shipping',
    delivered = 'delivered',
    done = 'done',
}

export enum PaymentMethod {
    cash = 'cash',
    card = 'card',
}

export enum AttributeType {
    Manual = 'manual',
    Options = 'options',
    Multiple = 'multiple',
}

export const ORDER_STATUS_ARR = Object.values(OrderStatus);
export enum DataTypeConvert {
    raw = 'raw',
    obj = 'obj',
}

export enum LOCATION_TYPES {
    SHIPPING_ADDRESS = 'shipping_address',
    DEFAULT = 'default',
}

export enum ROLE {
    USER = 'user',
    ADMIN = 'admin',
}

export enum ReportReason {
    InappropriateContent = 'Nội dung không phù hợp:',
    Spam = 'Spam',
    OffensiveLanguage = 'Ngôn ngữ thô tục',
    Other = 'Lý do khác...',
    Harassment = 'Quấy rối',
    Misinformation = 'Thông tin sai lệch',
    advertisement = 'Quảng cáo',
}

export enum Role {
    USER = 'user',
    ADMIN = 'admin',
}

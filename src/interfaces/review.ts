interface IReviewVariant {
    variantId: string;
    size: string;
    color: string;
    name: string;
}

export interface IReviewItem {
    _id: string;
    productId: string;
    rating: number;
    content: string;
    userId: {
        _id: string;
        name: string;
        avatar: string;
    };
    variants: IReviewVariant[];
    createdAt: string;
    updatedAt: string;
}
export interface IReviewStarResponse {
    reviewsStar: {
        _id: string;
        rating: number;
    }[];
    everage: number;
}

export interface IReviewResponse {
    data: IReviewItem[];
}

export interface ICreateReviewPayload {
    productId: string;
    content: string;
    rating: number;
    orderId: string;
}

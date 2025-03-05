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
    variant: {
        size: string;
        color: string;
        name: string;
    };
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
    everage: number;
    data: IReviewItem[];
}

export interface ICreateReviewPayload {
    productId: string;
    variantId: string;
    content: string;
    rating: number;
    orderId: string;
}

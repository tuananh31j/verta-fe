export interface IReviewItem {
    _id: string;
    productId: string;
    rating: number;
    content: string;
    name: string;
    variants: {
        name: string;
        variantId: string;
        color: string;
        size: string;
        _id: string;
    }[];
    userId: {
        _id: string;
        name: string;
        avatar: string;
    };
    isHided: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface IReviewItemTable {
    _id: string;
    productId: string;
    rating: number;
    content: string;
    userId: string;
    userName: string;
    isHided: boolean;
    variants: {
        name: string;
        variantId: string;
        color: string;
        size: string;
        _id: string;
    }[];
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

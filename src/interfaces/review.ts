export interface IReviewItem {
    _id: string;
    productId: string;
    rating: number;
    content: string;
    name: string;
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

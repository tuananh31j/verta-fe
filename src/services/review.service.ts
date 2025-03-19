import { REVIEWS_ENDPOINT } from '~/constants/endPoint';
import { PaginateResponse } from '~/interfaces/api';
import { ICreateReviewPayload, IReviewResponse, IReviewStarResponse } from '~/interfaces/review';
import { Params } from '~/types/Api';
import instance from '~/utils/api/axiosInstance';

export const reviewService = {
    async getAllReviewProduct(productId: string, params: Params) {
        const res = await instance.get<PaginateResponse<IReviewResponse>>(
            `${REVIEWS_ENDPOINT.ALL_REVIEWS_PRODUCT}/${productId}`,
            {
                params,
            }
        );
        return res.data;
    },
    async createReview(body: ICreateReviewPayload) {
        const res = await instance.post<null>(REVIEWS_ENDPOINT.CREATE_REVIEW, body);
        return res.data;
    },
    async getAllRatingStars(productId: string) {
        const res = await instance.get<IReviewStarResponse>(`${REVIEWS_ENDPOINT.ALL_REVIEWS_STARS}/${productId}`);
        return res.data;
    },
    async getAllReviews(params: Params) {
        const res = await instance.get<PaginateResponse<IReviewResponse>>(
            `${REVIEWS_ENDPOINT.ALL_REVIEWS_PRODUCT_ADMIN}`,
            {
                params,
            }
        );
        return res.data;
    },
    async hiddenReview(id: string) {
        const res = await instance.post<null>(`${REVIEWS_ENDPOINT.HIDDEN_REVIEW}/${id}`);
        return res.data;
    },
    async activeReview(id: string) {
        const res = await instance.post<null>(`${REVIEWS_ENDPOINT.ACTIVE_REVIEW}/${id}`);
        return res.data;
    },
};

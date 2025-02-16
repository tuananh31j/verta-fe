export interface PaginateResponse<T> {
    data: T;
    page: number;
    totalDocs: number;
    totalPages: number;
}

export interface IServerResponse<T> {
    data: T;
    status: number;
    message: string;
    success: boolean;
}

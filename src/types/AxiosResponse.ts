export type IAxiosResponse<T> = {
    success?: boolean;
    message?: string;
    status?: number;
    data: T;
} & T;

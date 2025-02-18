export type IAxiosResponse<T> = {
    success?: boolean;
    message?: string;
    status?: number;
} & T;

export type IRankValue = {
    min: number | string;
    max: string | number;
};

export type Params = {
    [key: string]: any;
    page?: string | number;
    sort?: string;
    limit?: string;
    fields?: string;
};

export type IPagination = { page: number; limit: number };

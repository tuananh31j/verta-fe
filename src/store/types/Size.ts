export interface ISize {
    _id: string;
    type: string;
    value: string;
}

export type ISizeResponse = {
    sizes: ISize[];
    page: number;
    totalDocs: number;
    totalPages: number;
};

export interface ISizeFormData {
    value: string;
}

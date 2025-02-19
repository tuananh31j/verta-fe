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
    name: string;
    type: SizeType;
}
export type SizeType = 'freesize' | 'numericsize';

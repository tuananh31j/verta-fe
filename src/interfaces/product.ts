interface Size {
    _id: string;
    value: string;
}

export interface ISizeInColor {
    _id: string;
    size: Size;
    stock: number;
}

interface Color {
    _id: string;
    name: string;
    hex: string;
    image: string;
}

export interface IVariantDetail {
    color: Color;
    items: ISizeInColor[];
}

export interface IProductDetail {
    code: string;
    _id: string;
    name: string;
    price: number;
    summary: string;
    thumbnail: string;
    thumbnailRef: string;
    sold: number;
    variants: IVariantDetail[];
    categories: {
        _id: string;
        name: string;
    }[];
    filterSize: string[];
    filterColor: string[];
    createdAt: string;
    updatedAt: string;
}
export type IProduct = {
    _id: string;
    name: string;
    price: number;
    summary: string;
    thumbnail: string;
    thumbnailRef: string;
    sold: number;
    type: {
        hasColor: boolean;
        sizeType: string;
    };
    variants: IVariantDetail[];
    categories: string[];
    code: string;
};

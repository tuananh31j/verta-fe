import { ICategory } from '~/types/category';
import { SizeEnum } from '~/types/enum';
import { IVariant } from '~/types/variant';

export type IProductResponse = {
    data: IProduct[];
    totalDocs: number;
};

export type IProduct = {
    _id: string;
    name: string;
    price: number;
    summary: string;
    thumbnail: string;
    thumbnailRef: string;
    sold: number;
    isHide: boolean;
    variants: IVariant[];
    categories: ICategory[];
    createdAt: string;
    updatedAt: string;
};

export type ICreateProductPayload = {
    name: string;
    price: number;
    thumbnail: string;
    thumbnailRef: string;
    summary: string;
    isDeleted?: boolean;
    isHide?: boolean;
    type: { hasColor: boolean; sizeType: SizeEnum };
    variants: string[];
    categories: string[];
    filterSize: string[];
    filterColor: string[];
    imageRefVariants: string[];
};

import { IColor } from '~/types/Color';
import { ISize } from '~/types/Size';

export type IVariant = {
    color: IColor;
    items: IVariantItem[];
};

export type IVariantItem = {
    _id: string;
    size: ISize;
    stock: number;
};

export type ICreateVariant = {
    image: string;
    imageRef: string;
    size: string;
    stock: number;
    color: string;
};

export type IVariantResponse = {
    image: string;
    imageRef: string;
    size: string;
    stock: number;
    color: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
};

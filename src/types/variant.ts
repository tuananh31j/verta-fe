import { IColor } from '~/types/color';
import { ISize } from '~/types/size';

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

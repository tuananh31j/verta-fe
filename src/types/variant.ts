import { IColor } from '~/types/color';

export type IVariant = {
    color: IColor;
    items: IVariantItem[];
};

export type IVariantItem = {
    _id: string;
    size: Size;
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

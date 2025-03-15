import { ICategory } from '~/types/Category';
import { SizeEnum } from '~/types/enum';
import { IVariant } from '~/types/Variant';

export type IProductResponse = {
    data: IProduct[];
    totalDocs: number;
};

export type IProduct = {
    _id: string;
    code: string;
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

export type FileItem = {
    uid: string;
    name: string;
    status: string;
    url: string;
};

export type Image = {
    fileList: FileItem[];
};

export type Property = {
    size: string; // ID của size
    stock: number;
    _id: string;
};

export type Variant = {
    color: string; // ID của màu sắc
    image: Image;
    properties: Property[];
};

export type ProductType = {
    hasColor: boolean;
    sizeType: string;
};

export type IProductDetailsForAdmin = {
    _id: string;
    code: string;
    name: string;
    price: number;
    summary: string;
    thumbnail: Image;
    thumbnailRef: string;
    sold: number;
    isDeleted: boolean;
    isHide: boolean;
    type: ProductType;
    variants: Variant[];
    categories: string; // ID của danh mục
    filterSize: string[]; // Danh sách ID của size
    filterColor: string[]; // Danh sách ID của màu sắc
    createdAt: string;
    updatedAt: string;
    sizeType: string;
};

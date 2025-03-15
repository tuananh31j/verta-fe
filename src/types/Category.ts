import { message } from 'antd';
export interface ICategoryPopular {
    totalProducts?: number;
    categoryId: string;
    categoryName: string;
    image: string;
}
export interface ICategory {
    _id: string;
    name: string;
    items: {
        _id: string;
        name: string;
    }[];
}

export type ICategoryResponse = {
    success: string;
    message: string;
    status: string;
    data: {
        _id: string;
        name: string;
        items: {
            _id: string;
            name: string;
        }[];
    }[];
};

export interface ICategoryFormData {
    name: string;
    items: string[] | [];
}

export type ICateUpdateFormData = {
    name: string;
    items?: {
        _id?: string;
        name: string;
    }[];
};

export type IMenu = { name: string; _id: string };

export type ICate = {
    _id: string;
    name: string;
    items: {
        _id: string;
        name: string;
    }[];
    createdAt: string;
    updatedAt: string;
};

export interface ICategoryPopular {
    totalProducts?: number;
    categoryId: string;
    categoryName: string;
    image: string;
}
export interface ICategory {
    _id: string;
    name: string;
}

export type ICategoryResponse = {
    categories: ICategory[];
    page: number;
    totalDocs: number;
    totalPages: number;
};

export interface ICategoryFormData {
    name: string;
}

export type IMenu = { name: string; _id: string };

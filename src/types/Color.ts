import { ICategory, ICategoryFormData } from './Category';

export interface IColor extends ICategory {
    hex: string;
}

export type IColorResponse = {
    colors: IColor[];
    page: number;
    totalDocs: number;
    totalPages: number;
};

export interface IColorFormData extends ICategoryFormData {
    hex: string;
}

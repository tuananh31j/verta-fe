import { ICategoryFormData } from './Category';

export type IColorResponse = {
    colors: IColor[];
    page: number;
    totalDocs: number;
    totalPages: number;
};

export interface IColorFormData extends ICategoryFormData {
    hex: string;
}

export type IColor = {
    _id: string;
    name: string;
    hex: string;
    image: string;
};

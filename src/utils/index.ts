import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import _ from 'lodash';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export const Currency = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

export const addKeysToArray = <T extends object>(data: T[]): (T & { key: number })[] => {
    return data.map((item, index) => ({
        ...item,
        key: index + 1,
    }));
};

export const generateParamsString = (key: string, sortValue: 1 | -1) => `${key}=${sortValue}`;
export const generateStringToObject = (value: string): Record<string, number> => {
    const arr = value.split('_');
    const obj = Object.fromEntries(arr.map((item) => item.split(' '))) as Record<string, number>;
    return obj;
};

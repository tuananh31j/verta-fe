import { ErrorMessage } from '../Message';

export const colorNameValidator = [
    {
        required: true,
        message: 'Vui lòng nhập tên màu!',
    },
    {
        validator(_: any, name: string) {
            if (name && name.length < 2) {
                return ErrorMessage('Tên màu phải lớn hơn 2 kí tự');
            }
            if (name && name.length > 30) {
                return ErrorMessage('Tên màu phải nhỏ hơn 30 kí tự');
            }
            return Promise.resolve();
        },
    },
];

export const colorHexValidator = [
    {
        required: true,
        message: 'Vui lòng nhập màu!',
    },
];

import { ErrorMessage } from '../Message';

export const sizeNameValidator = [
    {
        required: true,
        message: 'Vui lòng nhập tên kích cỡ!',
    },
    {
        validator(_: any, name: string) {
            if (name && name.length < 2) {
                return ErrorMessage('Tên kích cỡ phải lớn hơn 2 kí tự');
            }
            if (name && name.length > 30) {
                return ErrorMessage('Tên kích cỡ phải nhỏ hơn 30 kí tự');
            }
            return Promise.resolve();
        },
    },
];

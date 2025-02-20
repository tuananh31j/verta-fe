import { ErrorMessage } from '../Message';

export const sizeNameValidator = [
    {
        required: true,
        message: 'Vui lòng nhập tên kích cỡ!',
    },
    {
        validator(_: any, name: string) {
            if (name.length < 0) {
                return ErrorMessage('Tên kích cỡ phải có ít nhất 2 kí tự');
            }
            if (name.length > 30) {
                return ErrorMessage('Tên kích cỡ không được vượt quá 30 kí tự');
            }
            if (name.trim() !== name) {
                return ErrorMessage('Tên kích cỡ không được có khoảng trắng ở đầu hoặc cuối');
            }
            return Promise.resolve();
        },
    },
];

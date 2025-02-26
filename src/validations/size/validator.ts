export const sizeNameValidator = [
    {
        required: true,
        message: 'Vui lòng nhập giá trị kích cỡ!',
    },
    {
        validator(_: any, value: string) {
            if (value.length < 2) {
                return Promise.reject('Giá trị kích cỡ phải có ít nhất 2 kí tự');
            }
            if (value.length > 30) {
                return Promise.reject('Giá trị kích cỡ không được vượt quá 30 kí tự');
            }
            if (value.trim() !== value) {
                return Promise.reject('Giá trị kích cỡ không được có khoảng trắng ở đầu hoặc cuối');
            }
            return Promise.resolve();
        },
    },
];

export const numericSizeValidator = {
    validator(_: any, value: string) {
        if (!/^\d+$/.test(value)) {
            return Promise.reject('Kích cỡ số phải là một số!');
        }
        return Promise.resolve();
    },
};

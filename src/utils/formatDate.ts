import dayjs from 'dayjs';

export const formatDate = (dateOld: string) => dayjs(dateOld).format('DD-MM-YYYY | hh:mm');
export const convertPaymenMethods = (payment: string) => {
    switch (payment) {
        case 'cash':
            return 'Tiền mặt';
        case 'card':
            return 'Tiền Thẻ';
        default:
            return 'Không Xác Định';
    }
};

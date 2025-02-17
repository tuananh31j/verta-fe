export const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const roundToNearestThousand = (value: number) => Math.round(value / 1000) * 1000;

export const calculateOriginPrice = (price: number, discount: number) => {
    const originPrice = price / (1 - discount / 100);
    const oldPrice = roundToNearestThousand(originPrice);
    return oldPrice;
};

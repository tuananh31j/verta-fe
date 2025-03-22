enum DiscountType {
    Percentage = 'percentage',
    Fixed = 'fixed',
}
export type IVoucher = {
    _id: string;
    name: string;
    code: string;
    maxUsage: number;
    voucherDiscount: number;
    status: boolean;
    isOnlyForNewUser: boolean;
    minimumOrderPrice: number;
    remainingQuantity: number;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    usagePerUser: number;
    usedCount?: number;
    discountType: DiscountType;
    maxDiscountAmount: number;
    remainingQuantity: number;
};

export type IVoucherDTO = Omit<IVoucher, '_id' | 'createdAt' | 'updatedAt'>;

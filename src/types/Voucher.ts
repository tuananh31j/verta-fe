export type IVoucher = {
    _id: string;
    name: string;
    code: string;
    maxUsage: number;
    voucherDiscount: number;
    status: boolean;
    isOnlyForNewUser: boolean;
    minimumOrderPrice: number;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    usagePerUser: number;
};

export type IVoucherDTO = Omit<IVoucher, '_id' | 'createdAt' | 'updatedAt'>;

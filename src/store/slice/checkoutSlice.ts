import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItem } from '~/interfaces/order';
import { IVoucher } from '~/types/Voucher';

export type CheckOutReduxType = {
    voucher: IVoucher | null;
    items: ProductItem[] | null;
    description: string;
    customerInfor: {
        name: string;
        email: string;
        phone: string;
    };
    shippingAddress: {
        serviceId: number;
        provinceId: number | null;
        province: string;
        country: 'Việt Nam';
        district: string;
        districtId: number | null;
        wardCode: string;
        ward: string;
        address: string;
    };
    shippingFee: number;
    totalPrice: number;
};

const initialState: CheckOutReduxType = {
    voucher: null,
    items: null,
    description: '', // 🛠 Sửa 'desription' thành 'description'
    customerInfor: {
        name: '',
        email: '',
        phone: '',
    },
    shippingAddress: {
        serviceId: 53320,
        provinceId: null,
        province: '',
        country: 'Việt Nam',
        districtId: null,
        district: '',
        wardCode: '',
        ward: '',
        address: '',
    },
    shippingFee: 0,
    totalPrice: 0,
};

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        changeVoucher: (state, action: PayloadAction<IVoucher>) => {
            state.voucher = action.payload;
        },
        removeVoucher: (state) => {
            state.voucher = null;
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        setPrice: (state, action: PayloadAction<number>) => {
            state.totalPrice = action.payload;
        },
        setShippingFee: (state, action: PayloadAction<number>) => {
            state.shippingFee = action.payload;
        },
        setShippingAddress: (state, action) => {
            state.shippingAddress = { ...state.shippingAddress, ...action.payload };
        },
        setCustomerInfo: (state, action) => {
            state.customerInfor = { ...state.customerInfor, ...action.payload };
        },
        setProductsItems: (state, action: PayloadAction<ProductItem[]>) => {
            state.items = action.payload;
        },
        reset: () => initialState,
    },
});

export const {
    setDescription,
    setProductsItems,
    setCustomerInfo,
    setShippingFee,
    setPrice,
    removeVoucher,
    changeVoucher,
    reset,
    setShippingAddress,
} = checkoutSlice.actions;
export default checkoutSlice;

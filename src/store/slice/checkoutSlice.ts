import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CheckOutReduxType = {
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
        reset: () => initialState,
    },
});

export const { setDescription, setCustomerInfo, setShippingFee, setPrice, reset, setShippingAddress } =
    checkoutSlice.actions;
export default checkoutSlice;

import React, { lazy } from 'react';
import Loader from '~/utils/Loader';

// Client
export const HomePage = lazy(() => import('~/pages/Home/Home'));
export const AuthPage = lazy(() => import('~/pages/Auth/AuthPage'));
export const VerifyAccountPage = lazy(() => import('~/pages/Auth/VerifyAccount'));
export const ProductDetailPage = lazy(() => import('~/pages/ProductDetail/ProductDetail'));
export const CartDetail = lazy(() => import('~/pages/Cart/CartDetail'));
export const Profile = lazy(() => import('~/pages/Account/Profile/Profile'));
export const MyOrders = lazy(() => import('~/pages/Account/MyOrders/MyOrders'));
export const MyDetailOrder = lazy(() => import('~/pages/Account/MyOrders/OrderDetail/OrderDetailPage'));
export const ShippingAddressPage = lazy(() => import('~/pages/Checkout/ShippingAddress/ShippingAddress'));
export const PaymentPage = lazy(() => import('~/pages/Checkout/MethodPayment/MethodPayment'));
export const MyAddressPage = lazy(()=> import('~/pages/Account/MyAddress/MyAddress'));

// Admin
export const ProductsList = lazy(() => import('~/pages/Admin/Product/ProductList'));
export const CreateProduct = lazy(() => import('~/pages/Admin/Product/CreateProduct'));
export const UpdateProduct = lazy(() => import('~/pages/Admin/Product/UpdateProduct'));
export const DashboardPage = lazy(() => import('~/pages/Admin/_dashboard_'));
export const ColorList = lazy(() => import('~/pages/Admin/_color_'));
export const CreateColor = lazy(() => import('~/pages/Admin/_color_/CreateColor'));
export const UpdateColor = lazy(() => import('~/pages/Admin/_color_/UpdateColor'));
export const SizeList = lazy(() => import('~/pages/Admin/_size_/'));
export const CreateSize = lazy(() => import('~/pages/Admin/_size_/CreateSize'));
export const UpdateSize = lazy(() => import('~/pages/Admin/_size_/UpdateSize'));
export const CategoryList = lazy(() => import('~/pages/Admin/_category_'));
export const CreateCategory = lazy(() => import('~/pages/Admin/_category_/CreateCategory'))
export const UpdateCategory = lazy(() => import('~/pages/Admin/_category_/UpdateCategory'))
export const UserList = lazy(() => import('~/pages/Admin/_user_/UserList'))

// Vouvher
export const VoucherList = lazy(() => import('~/pages/Admin/Voucher/List'));
export const FormVoucher = lazy(() => import('~/pages/Admin/Voucher/FormVoucher'));

export const ManageOrders = lazy(
    () => import('~/pages/Admin/_order_/ManageOrder'),
);
export const OrdersDetails = lazy(
    () => import('~/pages/Admin/_order_/OrderDetails'),
);
export const ReviewList = lazy(() => import('~/pages/Admin/_review_/ReviewList'));


export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<Loader />}>{children}</React.Suspense>;
};

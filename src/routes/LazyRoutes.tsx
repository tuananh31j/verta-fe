import React, { lazy } from 'react';

// Client
export const HomePage = lazy(() => import('~/pages/Home/Home'));
export const ProfilePage = lazy(() => import('~/pages/Clients/Account/Profile/Profile'));
export const MyOrdersPage = lazy(() => import('~/pages/Clients/Account/MyOrders/MyOrders'));
export const AuthPage = lazy(() => import('~/pages/Auth/AuthPage'));
export const VerifyAccountPage = lazy(() => import('~/pages/Auth/VerifyAccount'));
export const ProductDetailPage = lazy(() => import('~/pages/ProductDetail/ProductDetail'));
export const CartDetail = lazy(() => import('~/pages/Cart/CartDetail'));
export const ShippingAddressPage = lazy(() => import('~/pages/Checkout/ShippingAddress/ShippingAddress'));
export const PaymentPage = lazy(() => import('~/pages/Checkout/MethodPayment/MethodPayment'));

// Admin
export const ProductsList = lazy(() => import('~/pages/Admins/Product/ProductList'));
export const CreateProduct = lazy(() => import('~/pages/Admins/Product/CreateProduct'));
export const UpdateProduct = lazy(() => import('~/pages/Admins/Product/UpdateProduct'));
export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<div>Loading</div>}>{children}</React.Suspense>;
};
export const DashboardPage = lazy(() => import('~/pages/Admins/_dashboard_'));
export const ColorList = lazy(() => import('~/pages/Admins/_color_'));
export const CreateColor = lazy(() => import('~/pages/Admins/_color_/CreateColor'));
export const UpdateColor = lazy(() => import('~/pages/Admins/_color_/UpdateColor'));
export const SizeList = lazy(() => import('~/pages/Admins/_size_'));
export const CreateSize = lazy(() => import('~/pages/Admins/_size_/CreateSize'));
export const UpdateSize = lazy(() => import('~/pages/Admins/_size_/UpdateSize'));

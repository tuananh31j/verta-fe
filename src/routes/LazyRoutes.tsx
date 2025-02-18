import React, { lazy } from 'react';

// Client
export const HomePage = lazy(() => import('~/pages/Home/Home'));
export const ProfilePage = lazy(() => import('~/pages/Clients/Account/Profile/Profile'));
export const MyOrdersPage = lazy(() => import('~/pages/Clients/Account/MyOrders/MyOrders'));
export const AuthPage = lazy(() => import('~/pages/Auth/AuthPage'));
export const VerifyAccountPage = lazy(() => import('~/pages/Auth/VerifyAccount'));
export const ProductDetailPage = lazy(() => import('~/pages/ProductDetail/ProductDetail'));
export const CartDetail = lazy(() => import('~/pages/Cart/CartDetail'));

// Admin
export const ProductsList = lazy(() => import('~/pages/Admins/Product/ProductList'));
export const CreateProduct = lazy(() => import('~/pages/Admins/Product/CreateProduct'));
export const UpdateProduct = lazy(() => import('~/pages/Admins/Product/UpdateProduct'));
export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<div>Loading</div>}>{children}</React.Suspense>;
};

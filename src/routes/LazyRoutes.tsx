import React, { lazy } from 'react';

// Client
export const HomePage = lazy(() => import('~/pages/Home/Home'));
export const ProfilePage = lazy(() => import('~/pages/Clients/Account/Profile/Profile'));
export const MyOrdersPage = lazy(() => import('~/pages/Clients/Account/MyOrders/MyOrders'));
export const AuthPage = lazy(() => import('~/pages/Auth/AuthPage'));
export const VerifyAccountPage = lazy(() => import('~/pages/Auth/VerifyAccount'));
export const ProductDetailPage = lazy(() => import('~/pages/ProductDetail/ProductDetail'));

// Admin

export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<div>Loading</div>}>{children}</React.Suspense>;
};
export const DashboardPage = lazy(() => import('~/pages/Admin/_dashboard_'));
export const ColorList = lazy(() => import('~/pages/Admin/_color_'));
export const CreateColor = lazy(() => import('~/pages/Admin/_color_/CreateColor'));
export const UpdateColor = lazy(() => import('~/pages/Admin/_color_/UpdateColor'));
export const SizeList = lazy(() => import('~/pages/Admin/_size_/'));
export const CreateSize = lazy(() => import('~/pages/Admin/_size_/CreateSize'));
export const UpdateSize = lazy(() => import('~/pages/Admin/_size_/UpdateSize'));

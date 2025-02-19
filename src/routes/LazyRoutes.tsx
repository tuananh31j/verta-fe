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

export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<Loader />}>{children}</React.Suspense>;
};

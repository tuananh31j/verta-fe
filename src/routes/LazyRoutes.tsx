import React, { lazy } from 'react';

// Client
export const HomePage = lazy(() => import('~/pages/Home/Home'));
export const AuthPage = lazy(() => import('~/pages/Auth/AuthPage'));
export const VerifyAccountPage = lazy(() => import('~/pages/Auth/VerifyAccount'));
export const ProductDetailPage = lazy(() => import('~/pages/ProductDetail/ProductDetail'));
export const CartDetail = lazy(() => import('~/pages/Cart/CartDetail'));
export const ShippingAddressPage = lazy(() => import('~/pages/Checkout/ShippingAddress/ShippingAddress'));
export const PaymentPage = lazy(() => import('~/pages/Checkout/MethodPayment/MethodPayment'));

export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<div>Loading</div>}>{children}</React.Suspense>;
};

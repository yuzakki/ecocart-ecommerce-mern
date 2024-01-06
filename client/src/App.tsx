// Imports: Libraries
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Imports: Layouts
import AppLayout from '@components/layouts/app-layout';
import AccountLayout from '@components/layouts/account-layout';

// Imports: Components
import { GlobalLoader } from '@components/loaders/global-loader';
import Settings from '@features/account/settings';
import ShowSingleOrder from '@features/orders/components/show-single-order';
import ShowOrdersList from '@features/orders/components/show-orders-list';

// Imports: Pages
import { PageNotFound } from '@components/not-found-ui';
import ConfirmOrder from '@features/orders/components/confirm-order';
import { SERVER_DOMAIN } from '@utils/constants';

const HomePage = lazy(() => import('@pages/home'));
const FeaturedPage = lazy(() => import('@pages/featured'));
const RecommendedPage = lazy(() => import('@pages/recommended'));
const ViewProductPage = lazy(() => import('@pages/view-product'));
const CartPage = lazy(() => import('@pages/cart'));
const SignUpPage = lazy(() => import('@pages/auth/sign-up'));
const LoginPage = lazy(() => import('@pages/auth/login'));
const ForgotPasswordPage = lazy(() => import('@pages/account/forgot-password'));
const ResetPasswordPage = lazy(() => import('@pages/account/reset-password'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <Suspense fallback={<GlobalLoader />}>
        <Router>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="featured" element={<FeaturedPage />} />
              <Route path="recommended" element={<RecommendedPage />} />

              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route
                path="reset-password/:token"
                element={<ResetPasswordPage />}
              />

              <Route path="product/:productId" element={<ViewProductPage />} />
              <Route path="cart" element={<CartPage />} />

              <Route path="account" element={<AccountLayout />}>
                <Route path="orders" element={<ShowOrdersList />} />
                <Route path="order/:orderID" element={<ShowSingleOrder />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="success" element={<ConfirmOrder />} />

              <Route path="*" element={<PageNotFound />} />
            </Route>

            <Route path="signup" element={<SignUpPage />} />
            <Route path="login" element={<LoginPage />} />
          </Routes>
        </Router>
      </Suspense>
    </QueryClientProvider>
  );
}

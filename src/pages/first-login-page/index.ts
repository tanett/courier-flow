import { lazy } from 'react';

const LazyFirstLoginPage = lazy(() => import('./ui/first-login-page'));

export { LazyFirstLoginPage };

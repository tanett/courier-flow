import { lazy } from 'react';

const LazyOrdersPage = lazy(() => import('pages/orders-page/ui/orders-page'));

export { LazyOrdersPage };

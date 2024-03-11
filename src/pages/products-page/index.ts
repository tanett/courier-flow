import { lazy } from 'react';

const LazyProductsPage = lazy(() => import('./ui/products-page'));

export { LazyProductsPage };

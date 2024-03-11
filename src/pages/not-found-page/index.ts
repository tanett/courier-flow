import { lazy } from 'react';

const LazyNotFoundPage = lazy(() => import('./ui/not-found-page'));

export { LazyNotFoundPage };

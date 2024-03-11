import { lazy } from 'react';

const LazyProfilePage = lazy(() => import('./ui/profile-page'));

export { LazyProfilePage };

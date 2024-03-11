import { lazy } from 'react';

const LazyUsersPage = lazy(() => import('./ui/users-page'));

export { LazyUsersPage };

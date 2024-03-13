import { lazy } from 'react';

const LazyUsersDetailsPage = lazy(() => import('pages/users-details-page/ui/users-details-page'));

export { LazyUsersDetailsPage };

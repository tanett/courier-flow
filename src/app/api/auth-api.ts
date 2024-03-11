import { createApi } from '@reduxjs/toolkit/query/react';
import { authQuery } from './custom-base-query';

export const authApi = createApi({
    reducerPath: 'authAPI',
    baseQuery: authQuery,
    refetchOnFocus: false,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    tagTypes: [], // todo add tags from entity
    endpoints: () => ({}),
});

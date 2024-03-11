import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './custom-base-query';
import { apiTagTypesUser } from '../../entities/users/api/types';

const tagTypes: Record<string, { type: string, id: string }> = { ...apiTagTypesUser };

export const baseApi = createApi({
    reducerPath: 'baseAPI',
    baseQuery: customBaseQuery,
    refetchOnFocus: false,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    tagTypes: [ ...Array.from(Object.values(tagTypes).map(tag => tag.type)) ],
    endpoints: () => ({}),
});

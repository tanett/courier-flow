import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './custom-base-query';
import { tagTypesExtendedUsersList } from '../../entities/users/api/types';
import { tagTypesProductsExtendedList } from '../../entities/products/api/types';
import { tagTypesCategoriesExtendedList } from '../../entities/category/api/types';
import { tagTypesTerminalsExtendedList } from '../../entities/terminals/api/types';
import { tagTypesExtendedStoresList } from '../../entities/stores/api/types';
import { tagTypesRolesExtendedList } from '../../entities/role/api/types';

const tagTypes: Record<string, { type: string, id: string }> = {
    ...tagTypesExtendedUsersList,
    ...tagTypesProductsExtendedList,
    ...tagTypesCategoriesExtendedList,
    ...tagTypesTerminalsExtendedList,
    ...tagTypesExtendedStoresList,
    ...tagTypesRolesExtendedList
};

export const baseApi = createApi({
    reducerPath: 'baseAPI',
    baseQuery: customBaseQuery,
    refetchOnFocus: false,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    tagTypes: [ ...Array.from(Object.values(tagTypes).map(tag => tag.type)) ],
    endpoints: () => ({}),
});

import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './custom-base-query';
import { tagTypesExtendedUsersList } from '../../entities-project/users/api/types';
import { tagTypesProductsExtendedList } from '../../entities-project/products/api/types';
import { tagTypesTerminalsExtendedList } from '../../entities-project/terminals/api/types';
import { tagTypesExtendedStoresList } from '../../entities-project/stores/api/types';
import { tagTypesShortSalesList } from '../../entities-project/sales/api/types';
import { tagTypeOrderFullItem, tagTypesOrdersShortList } from '../../entities-project/orders/api/types';


const tagTypes: Record<string, { type: string, id: string }> = {
    ...tagTypesExtendedUsersList,
    ...tagTypesProductsExtendedList,

    ...tagTypesTerminalsExtendedList,
    ...tagTypesExtendedStoresList,

    ...tagTypesShortSalesList,

    ...tagTypesOrdersShortList,


};

export const baseApi = createApi({
    reducerPath: 'baseAPI',
    baseQuery: customBaseQuery,
    refetchOnFocus: false,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    tagTypes: [ ...Array.from(Object.values(tagTypes).map(tag => tag.type)), tagTypeOrderFullItem.type ],
    endpoints: () => ({}),
});

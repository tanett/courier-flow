import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from './custom-base-query';
import { tagTypesExtendedUsersList } from '../../entities/users/api/types';
import { tagTypesProductsExtendedList } from '../../entities/products/api/types';
import { tagTypesCategoriesExtendedList } from '../../entities/category/api/types';
import { tagTypesTerminalsExtendedList } from '../../entities/terminals/api/types';
import { tagTypesExtendedStoresList } from '../../entities/stores/api/types';
import { tagTypesRolesExtendedList } from '../../entities/role/api/types';
import { tagTypesShortSalesList } from '../../entities/sales/api/types';
import { tagTypesRefundsList } from '../../entities/refunds/api/types';
import { tagTypesTerminalConfigurationsList } from '../../entities/terminals-configurations/api/types';
import { tagTypesShortAdvancesList } from '../../entities/advances/api/types';
import { tagTypesCreditsList } from '../../entities/credits/api/types';
import { tagTypesWorkingShiftsList } from '../../entities/working-shifts/api/types';
import { tagTypeOrderFullItem, tagTypesOrdersShortList } from '../../entities/orders/api/types';
import { tagTypesCashDeskList } from '../../entities/cash-desk/api/types';
import { tagTypesCashDeskOperationList } from '../../entities/cash-desk-operations/model/types';

const tagTypes: Record<string, { type: string, id: string }> = {
    ...tagTypesExtendedUsersList,
    ...tagTypesProductsExtendedList,
    ...tagTypesCategoriesExtendedList,
    ...tagTypesTerminalsExtendedList,
    ...tagTypesExtendedStoresList,
    ...tagTypesRolesExtendedList,
    ...tagTypesShortSalesList,
    ...tagTypesRefundsList,
    ...tagTypesTerminalConfigurationsList,
    ...tagTypesShortAdvancesList,
    ...tagTypesCreditsList,
    ...tagTypesWorkingShiftsList,
    ...tagTypesOrdersShortList,
    ...tagTypesCashDeskList,
    ...tagTypesCashDeskOperationList,

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

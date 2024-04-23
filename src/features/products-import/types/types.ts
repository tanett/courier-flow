import { typeStoreListChecked } from 'features/products-import/ui/select-stores/types';
import { PRODUCT_IMPORT_TYPE_REQUEST } from 'entities/products/api/types';
import React from 'react';

export type typeProductImport = { onClose: () => void }

export type typeImportOptions = {
    importType: PRODUCT_IMPORT_TYPE_REQUEST,
    options?: { isAllSelected: boolean, countStores: number, selectedStores: typeStoreListChecked[] }

}

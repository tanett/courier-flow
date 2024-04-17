import React from 'react';
import { typeStore } from '../../../../entities/stores/model/types';
import { typeImportOptions } from 'features/products-import/types/types';

export type typeSelectStores = {
    setStep: React.Dispatch<React.SetStateAction<0 | 1 | 2>>
    setImportOptions: React.Dispatch<React.SetStateAction<typeImportOptions | null>>
}

export type typeStoreListChecked = typeStore & { checked: boolean }

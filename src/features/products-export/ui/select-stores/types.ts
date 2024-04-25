import React from 'react';
import { typeStore } from '../../../../entities/stores/model/types';
import { typeExportOptions } from 'features/products-export/types/types';

export type typeSelectStores = {
    setStep: React.Dispatch<React.SetStateAction<0 | 1 | 2 >>
    options: typeExportOptions
    setOptions: React.Dispatch<React.SetStateAction<typeExportOptions | null>>
}

export type typeStoreListChecked = typeStore & { checked: boolean }

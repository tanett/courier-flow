import React from 'react';
import { typeStore } from '../../../../entities/stores/model/types';
import { typeOptions } from 'features/products-import/types/types';

export type typeSelectStores = {
    setStep: React.Dispatch<React.SetStateAction<0 | 1 >>
    options: typeOptions
    setOptions: React.Dispatch<React.SetStateAction<typeOptions | null>>
}

export type typeStoreListChecked = typeStore & { checked: boolean }

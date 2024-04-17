import React from 'react';
import { typeStoreListChecked } from 'features/products-import/ui/select-stores/types';

export type typeProductImport = { onClose: () => void }

export type typeSelectTypeOfImport = {
    setStep: React.Dispatch<React.SetStateAction<0 | 1 | 2>>,
    setImportOptions: React.Dispatch<React.SetStateAction<typeImportOptions | null>>
}

export type typeSelectFile = {
    setStep: React.Dispatch<React.SetStateAction<0 | 1 | 2>>,
    importOptions: typeImportOptions
}

export type typeImportOptions = {
    importType: string,
    options?: { isAllSelected: boolean, countAllStores: number } | { selectedStores: typeStoreListChecked[] }
}

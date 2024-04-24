import React from 'react';
import { typeStore } from '../../entities/stores/model/types';

export type typeSelectStoresForImportExport = {
    setCountAllStores: React.Dispatch<React.SetStateAction<number>>
    setSelectedStores: React.Dispatch<React.SetStateAction<typeStoreListChecked[]>>
    selectedStores: typeStoreListChecked[]
    setIsAllChecked: React.Dispatch<React.SetStateAction<boolean>>
    isAllChecked: boolean
}

export type typeStoreListChecked = typeStore & { checked: boolean }

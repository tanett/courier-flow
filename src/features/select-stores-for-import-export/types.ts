import React from 'react';
import { typeStore } from '../../entities/stores/model/types';
import { TransProps } from '@lingui/react';

export type typeSelectStoresForImportExport = {
    setCountAllStores: React.Dispatch<React.SetStateAction<number>>
    setSelectedStores: React.Dispatch<React.SetStateAction<typeStoreListChecked[]>>
    selectedStores: typeStoreListChecked[]
    setIsAllChecked: React.Dispatch<React.SetStateAction<boolean>>
    isAllChecked: boolean
    label: React.ReactElement<TransProps>
    bigPadding: boolean
}

export type typeStoreListChecked = typeStore & { checked: boolean }

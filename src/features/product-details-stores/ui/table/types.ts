import React from 'react';
import { typeRetailProduct } from '../../../../entities/retail-products/model/types';

export type typeProductStoresAndPricesTable = {
    retailProductList: typeRetailProduct[] | undefined,
    isLoading: boolean,
    setRefetchList: React.Dispatch<React.SetStateAction<boolean>>
    onOpenDialogDeleteRetailProduct: (id: string)=>void
    onOpenDialogChangePriceRetailProduct: (id: string)=>void
    isAllowEditProduct: boolean | null,
}

import { typeExportOptions } from 'features/products-export/types/types';

export type typeExportProductsDialog = {
    options: typeExportOptions,
    setStep: React.Dispatch<React.SetStateAction<0 | 1 | 2>>
    productIds?: string[]
}

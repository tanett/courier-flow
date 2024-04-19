import React from 'react';
import { typeImportOptions } from 'features/products-import/types/types';

export type typeSelectTypeOfImport = {
    setStep: React.Dispatch<React.SetStateAction<0 | 1 | 2>>,
    setImportOptions: React.Dispatch<React.SetStateAction<typeImportOptions | null>>
}

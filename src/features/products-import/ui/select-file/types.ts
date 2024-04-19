import React from 'react';
import { typeImportOptions } from 'features/products-import/types/types';

export type typeSelectFile = {
    setStep: React.Dispatch<React.SetStateAction<0 | 1 | 2>>,
    importOptions: typeImportOptions
}

import React from 'react';
import { typeOptions } from 'features/products-import/types/types';

export type typeSelectTypeOfImport = {
    setStep: React.Dispatch<React.SetStateAction<0 | 1 | 2>>,
    setOptions: React.Dispatch<React.SetStateAction<typeOptions | null>>
}

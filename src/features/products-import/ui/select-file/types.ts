import React from 'react';
import { typeOptions } from 'features/products-import/types/types';

export type typeSelectFile = {
    setStep: React.Dispatch<React.SetStateAction<0 | 1 | 2>>,
    options: typeOptions
}

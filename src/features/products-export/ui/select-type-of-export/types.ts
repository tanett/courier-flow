import React from 'react';
import { typeExportOptions } from '../../types/types';


export type typeSelectTypeOfExport = {
    setStep: React.Dispatch<React.SetStateAction<0 | 1 | 2>>,
    setOptions: React.Dispatch<React.SetStateAction<typeExportOptions | null>>
}

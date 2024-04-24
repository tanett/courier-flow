import React from 'react';
import { typeOptions } from '../../types/types';


export type typeSelectTypeOfExport = {
    setStep: React.Dispatch<React.SetStateAction<0 | 1 >>,
    setOptions: React.Dispatch<React.SetStateAction<typeOptions | null>>
}

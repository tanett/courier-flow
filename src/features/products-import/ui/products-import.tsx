import React, { useState } from 'react';
import { SelectTypeOfImport } from 'features/products-import/ui/select-type-of-import/select-type-of-import';
import { SelectStores } from './select-stores/select-stores';
import { SelectFile } from 'features/products-import/ui/select-file/select-file';
import { typeOptions } from '../types/types';


export const ProductsImport: React.FC = () => {

    const [ step, setStep ] = React.useState<0 | 1 | 2>(0);

    const [ options, setOptions ] = useState<null | typeOptions>(null);

    return (
        <div style={ {
            minWidth: '300px',
            maxWidth: '890px'
        } }>
            { step === 0 && <SelectTypeOfImport setStep={ setStep } setOptions={ setOptions }/> }
            { step === 1 && options &&  <SelectStores setStep={ setStep } setOptions={ setOptions } options={ options }/> }
            { step === 2 && options && <SelectFile setStep={ setStep } options={ options } /> }
        </div>
    );

};

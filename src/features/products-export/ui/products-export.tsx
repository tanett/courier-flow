import React, { useState } from 'react';
import { SelectStores } from './select-stores/select-stores';
import { typeOptions } from '../types/types';
import { SelectTypeOfExport } from './select-type-of-export/select-type-of-export';


export const ProductsExport: React.FC = () => {

    const [ step, setStep ] = React.useState<0 | 1 >(0);

    const [ options, setOptions ] = useState<null | typeOptions>(null);

    return (
        <div style={ {
            minWidth: '300px',
            maxWidth: '890px'
        } }>
            { step === 0 && <SelectTypeOfExport setStep={ setStep } setOptions={ setOptions }/> }
            { step === 1 && options && <SelectStores setStep={ setStep } options={options} setOptions={ setOptions } /> }

        </div>
    );

};

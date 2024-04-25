import React, { useState } from 'react';
import { SelectStores } from './select-stores/select-stores';
import { SelectTypeOfExport } from './select-type-of-export/select-type-of-export';
import { ExportProductsDialog } from 'features/products-export/ui/export-product-dialog/export-products-dialog';
import { typeExportOptions } from 'features/products-export/types/types';


export const ProductsExport: React.FC<{productIds?: string[]}> = ({ productIds }) => {

    const [ step, setStep ] = React.useState<0 | 1 | 2>(0);

    const [ options, setOptions ] = useState<null | typeExportOptions>(null);

    return (
        <div style={ {
            minWidth: '300px',
            maxWidth: '890px',
        } }>
            { step === 0 && <SelectTypeOfExport setStep={ setStep } setOptions={ setOptions }/> }

            { step === 1 && options && <SelectStores setStep={ setStep } options={options} setOptions={ setOptions } /> }

            { step === 2 && options && <ExportProductsDialog options={options} productIds={ productIds } setStep={ setStep }/> }

        </div>
    );

};

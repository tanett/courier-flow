import React, { useState } from 'react';
import { useMantineTheme } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { useAppDispatchT } from 'app/state';
import { SelectTypeOfImport } from 'features/products-import/ui/select-type-of-import/select-type-of-import';
import { SelectStores } from './select-stores/select-stores';
import { SelectFile } from 'features/products-import/ui/select-file/select-file';
import { typeImportOptions, typeProductImport } from '../types/types';
import { useProductsList } from 'entities/products/hooks/use-products-list';
import { useProductsListRefetch } from 'entities/products/hooks/use-products-list-refetch';


export const ProductsImport: React.FC<typeProductImport> = ({ onClose, }) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const [ step, setStep ] = React.useState<0 | 1 | 2>(0);

    const [ importOptions, setImportOptions ] = useState<null | typeImportOptions>(null);

    const dispatchAppT = useAppDispatchT();


    return (
        <div style={ {
            minWidth: '300px',
            maxWidth: '890px'
        } }>
            { step === 0 && <SelectTypeOfImport setStep={ setStep } setImportOptions={ setImportOptions }/> }
            { step === 1 && <SelectStores setStep={ setStep } setImportOptions={ setImportOptions } importOptions={ importOptions }/> }
            { step === 2 && importOptions && <SelectFile setStep={ setStep } importOptions={ importOptions } /> }
        </div>
    );

};

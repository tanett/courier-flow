import React from 'react';
import { Flex, Space } from '@mantine/core';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { BuildingStorefrontIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { CardImportExport } from 'shared/ui/card-import-export';
import { typeSelectTypeOfExport } from './types';
import { PRODUCT_EXPORT_TYPE_REQUEST } from 'features/products-export/types/types';


export const SelectTypeOfExport: React.FC<typeSelectTypeOfExport> = ({
    setStep,
    setOptions,
}) => {

    const { i18n } = useLingui();

    return (
        <Flex direction="column" pb={ 8 } px={ 15 } mt={ '-15px' }>
            <Space h={ 36 }/>
            <Flex direction={ 'row' } wrap={ 'wrap' } gap={ 16 } justify={ 'center' }>

                <CardImportExport icon={ <DocumentTextIcon/> }
                    label={ i18n._(t`Export of goods`) }
                    description={ i18n._(t`Exporting a product catalog without specifying links to stores and prices`) }

                    onClick={ () => {

                        setStep(2);
                        setOptions({ type: PRODUCT_EXPORT_TYPE_REQUEST.CATALOG });

                    } }
                />
                <CardImportExport icon={ <BuildingStorefrontIcon/> }
                    label={ i18n._(t`Export of goods with prices`) }
                    description={ i18n._(t`Export products with associated stores and prices`) }
                    onClick={ () => {

                        setStep(1);
                        setOptions({ type: PRODUCT_EXPORT_TYPE_REQUEST.RETAIL });

                    } }
                />

            </Flex>
        </Flex>
    );

};

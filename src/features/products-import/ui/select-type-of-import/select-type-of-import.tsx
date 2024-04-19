import React from 'react';
import { Box, Flex, useMantineTheme } from '@mantine/core';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ButtonPanelMenu } from 'shared/ui/button-panel-menu';
import { BuildingStorefrontIcon, DocumentTextIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { CardImport } from 'features/products-import/ui/select-type-of-import/card-import';
import { typeSelectTypeOfImport } from 'features/products-import/ui/select-type-of-import/types';
import { PRODUCT_IMPORT_TYPE_FOR_TEMPLATE } from '../../../../entities/products/model/state-slice';
import { useGetFileTemplateForImportProduct } from 'features/products-import/hooks/use-get-file-template-for-import-product';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { PRODUCT_IMPORT_TYPE_REQUEST } from '../../../../entities/products/api/types';


export const SelectTypeOfImport: React.FC<typeSelectTypeOfImport> = ({
    setStep,
    setImportOptions
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const { onTemplateDownload: onTemplateBlockTerminalsDownload, isTemplateLoading: isLoadingTemplate } = useGetFileTemplateForImportProduct();

    return (
        <Flex direction="column" pb={ 8 } px={ 15 } mt={ '-15px' }>
            <Box sx={ {
                alignSelf: 'end',
                marginBottom: '8px',
                position:'relative'
            } }>
                <ButtonPanelMenu
                    trigger={ 'hover' }
                    sxForMainButton={ {
                        border: 'none',
                        width: '36px',
                        height: '36px',
                        '&:hover, &:active, &:focus, &[aria-expanded="true"]': {
                            backgroundColor: theme.colors.primary[0],
                            border: `1px solid ${ theme.colors.gray[5] }`,
                            borderRadius: '4px'
                        }
                    } }>
                    <ButtonPanelMenu.MenuItem
                        label={ i18n._(t`Import file template for stores specified in the Excel file`) }
                        onClick={ () => onTemplateBlockTerminalsDownload(PRODUCT_IMPORT_TYPE_FOR_TEMPLATE.RETAIL_PRODUCT_EXCEL_IMPORT) }
                    />
                    <ButtonPanelMenu.MenuItem
                        label={ i18n._(t`Import file template for selected stores`) }
                        onClick={ () => onTemplateBlockTerminalsDownload(PRODUCT_IMPORT_TYPE_FOR_TEMPLATE.RETAIL_PRODUCT_FILTER_IMPORT) }
                    />
                    <ButtonPanelMenu.MenuItem
                        label={ i18n._(t`Template file for import into catalog`) }
                        onClick={ () => onTemplateBlockTerminalsDownload(PRODUCT_IMPORT_TYPE_FOR_TEMPLATE.PRODUCT_IMPORT_CATALOG) }
                    />
                </ButtonPanelMenu>
                {isLoadingTemplate && <LoaderOverlay/>}
            </Box>
            <Flex direction={ 'row' } wrap={ 'wrap' } gap={ 16 } justify={ 'center' }>
                <CardImport icon={ <DocumentTextIcon/> }
                            label={ i18n._(t`To the stores indicated in the Excel file`) }
                            description={ i18n._(t`Stores and prices for each product are indicated in the import file`) }
                            onClick={ () => {
                                setStep(2);
                                setImportOptions({ importType: PRODUCT_IMPORT_TYPE_REQUEST.RETAIL_PRODUCT_FROM_EXCEL });
                            } }
                />
                <CardImport icon={ <BuildingStorefrontIcon/> }
                            label={ i18n._(t`To selected stores`) }
                            description={ i18n._(t`Uploading products to selected stores with a price from the import file`) }
                            onClick={ () => {
                                setStep(1);
                                setImportOptions({ importType: PRODUCT_IMPORT_TYPE_REQUEST.RETAIL_PRODUCT_FROM_FILTER });
                            } }
                />
                <CardImport icon={ <Squares2X2Icon/> }
                            label={ i18n._(t`To catalog`) }
                            description={ i18n._(t`Uploading products to the catalog without indicating prices or attaching them to stores`) }
                            onClick={ () => {
                                setStep(2);
                                setImportOptions({ importType: PRODUCT_IMPORT_TYPE_REQUEST.PRODUCT_CATALOG });
                            } }
                />
            </Flex>
        </Flex>
    );

};

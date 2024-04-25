import React from 'react';
import { SimpleGrid, useMantineTheme } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { InfoCardSmall } from 'shared/ui/info-card-small';
import { BookmarkIcon, FolderIcon, ReceiptPercentIcon } from '@heroicons/react/24/outline';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { useGetProductByIdQuery } from '../../../entities/products/api/api';
import { BarcodeScanIconOutline } from 'shared/ui/barcodescan-icon-outline/barcode-scan-icon-outline';
import { getValueFromAdditionalField } from 'features/products-details/helpers/get-value-from-additional-field';


export const ProductDetails: React.FC<{ productId: string }> = ({ productId }) => {

    const theme = useMantineTheme();

    const { i18n } = useLingui();

    const {
        data: productData,
        isFetching,
    } = useGetProductByIdQuery(productId);

    const vat = productData ? (productData.vat * 100).toFixed(2) + ' %' : '';

    return (
        <>
            <SimpleGrid
                sx={ {
                    border: `1px solid ${ theme.colors.borderColor[ 0 ] }`,
                    borderTopRightRadius: '8px',
                    borderBottomRightRadius: '8px',
                    borderBottomLeftRadius: '8px',
                    padding: '10px 16px',
                    marginTop: '-1px',
                    backgroundColor: theme.white,
                } }
                breakpoints={ [
                    {
                        minWidth: 'md',
                        cols: 1,
                        spacing: 10,
                    },
                    {
                        minWidth: 1200,
                        cols: 2,
                        spacing: 60,
                    }
                ] }>
                <SimpleGrid
                    breakpoints={ [
                        {
                            minWidth: 'md',
                            cols: 2,
                            spacing: 10,
                        },
                        {
                            minWidth: 1200,
                            cols: 2,
                            spacing: 60,
                        }
                    ] }
                >
                    <InfoCardSmall label={ i18n._(t`PSID`) } content={ productData ? getValueFromAdditionalField(productData.productAdditionalFields, 'PSID') : '-' } withBottomBorder={ true }/>
                    <InfoCardSmall label={ i18n._(t`Package code`) } content={ productData ? getValueFromAdditionalField(productData.productAdditionalFields, 'PACKAGE_CODE') : '-' } withBottomBorder={ true }/>
                </SimpleGrid>
                <InfoCardSmall label={ i18n._(t`Category`) } iconLabel={ <FolderIcon/> } content={ productData?.productCategory?.name || '-' } withBottomBorder={ true }/>
                <SimpleGrid
                    breakpoints={ [
                        {
                            minWidth: 'md',
                            cols: 2,
                            spacing: 10,
                        },
                        {
                            minWidth: 1200,
                            cols: 2,
                            spacing: 60,
                        }
                    ] }
                >
                    <InfoCardSmall label={ i18n._(t`Comission TIN`) } content={ productData ? getValueFromAdditionalField(productData.productAdditionalFields, 'COMMISSION_TIN') : '-' } withBottomBorder={ true }/>
                    <InfoCardSmall label={ i18n._(t`Comission PINFL`) } content={ productData ? getValueFromAdditionalField(productData.productAdditionalFields, 'COMMISSION_PINFL') : '-' } withBottomBorder={ true }/>
                </SimpleGrid>
                <SimpleGrid
                    breakpoints={ [
                        {
                            minWidth: 'md',
                            cols: 2,
                            spacing: 10,
                        },
                        {
                            minWidth: 1200,
                            cols: 2,
                            spacing: 60,
                        }
                    ] }
                >
                    <InfoCardSmall label={ i18n._(t`Marking`) } iconLabel={ <BookmarkIcon/> } content={ productData ? productData.marked ? <Trans>Yes</Trans> : <Trans>No</Trans> : ''} withBottomBorder={ true }/>
                    <InfoCardSmall label={ i18n._(t`Vat`) } iconLabel={ <ReceiptPercentIcon/> } content={ vat } withBottomBorder={ true }/>

                </SimpleGrid>
                <SimpleGrid
                    breakpoints={ [
                        {
                            minWidth: 'md',
                            cols: 2,
                            spacing: 10,
                        },
                        {
                            minWidth: 1200,
                            cols: 2,
                            spacing: 60,
                        }
                    ] }
                >
                    <InfoCardSmall label={ i18n._(t`Unit`) } content={ productData?.unit || '-' } withBottomBorder={ false }/>
                    <InfoCardSmall label={ i18n._(t`Unit code`) } content={ productData ? getValueFromAdditionalField(productData.productAdditionalFields, 'UNIT_CODE') : '-' } withBottomBorder={ false }/>
                </SimpleGrid>
                <InfoCardSmall label={ i18n._(t`Barcodes`) } iconLabel={ <BarcodeScanIconOutline/> } content={(productData?.barcodes || productData?.barcodes.length === 0) ? '-' : productData?.barcodes.join(', ') } withBottomBorder={ false }/>

            </SimpleGrid>
            { isFetching && <LoaderOverlay/> }
        </>
    );

};

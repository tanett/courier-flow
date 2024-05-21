import React from 'react';
import { Box, SimpleGrid, Space, useMantineTheme, Text } from '@mantine/core';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { InfoCardSmall } from 'shared/ui/info-card-small';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import ButtonAsLink from 'shared/ui/button-as-link/button-as-link';
import { useNavigate } from 'react-router-dom';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import { useGetData } from '../hooks/use-get-data';
import NotFoundPage from 'pages/not-found-page/ui/not-found-page';


export const SoldProductsDetails: React.FC<{ id: string, productName: string }> = ({
    id,
    productName
}) => {

    const theme = useMantineTheme();

    const { i18n } = useLingui();

    const navigate = useNavigate();

    const {
        product,
        isNotFound,
        isLoading
    } = useGetData(id, productName);


    return (isNotFound
            ? <NotFoundPage/>
            : <>
            <Box sx={ {
                border: `1px solid ${ theme.colors.borderColor[0] }`,
                borderTopRightRadius: '8px',
                borderBottomRightRadius: '8px',
                borderBottomLeftRadius: '8px',
                padding: '10px 16px',
                marginTop: '-1px',
                backgroundColor: theme.white,
            } }>

                <InfoCardSmall label={ i18n._(t`Product`) }
                               content={ product
                                   ? product.id
                                       ? <ButtonAsLink onClick={ () => console.log('click')} label={ i18n._(t`See product card`) }/>
                                       : 'The product does not exist in the product catalog'
                                   : '-' }/>
                <SimpleGrid

                    breakpoints={ [
                        {
                            minWidth: 'md',
                            cols: 2,
                            spacing: 10,
                        },
                        {
                            minWidth: 1200,
                            cols: 4,
                            spacing: 60,
                        }
                    ] }>
                    <InfoCardSmall label={ i18n._(t`Quantity`) }
                                   alignSelfStretch={ true }
                                   content={ product ?  product.quantity : '-' }/>
                    <InfoCardSmall label={ i18n._(t`Price for unit`) }
                                   alignSelfStretch={ true }
                                   content={ product?.unitPrice ? numberCurrencyFormat(product.unitPrice) : '-' }/>
                    <InfoCardSmall label={ i18n._(t`Total price`) }
                                   alignSelfStretch={ true }
                                   content={ (product?.quantity && product?.unitPrice) ? numberCurrencyFormat(product.quantity *  product.unitPrice) : '-' }/>
                    <div/>
                    <InfoCardSmall label={ i18n._(t`Discount %/sum`) }
                    alignSelfStretch={ true }
                    content={ product ? <Text>{product?.discountPercent && numberCurrencyFormat(product.discountPercent)}% / {product?.discountAmount && numberCurrencyFormat(product.discountAmount)}</Text>  : '-' }/>
                    <InfoCardSmall label={ i18n._(t`VAT %/sum`) }
                                   alignSelfStretch={ true }
                                   content={ product? <Text>{product?.vatPercent && numberCurrencyFormat(product.vatPercent)}% / {product?.vatAmount && numberCurrencyFormat(product.vatAmount)}</Text>: '-' }/>
                    <InfoCardSmall label={ i18n._(t`Total cost`) }
                                   alignSelfStretch={ true }
                                   content={ product?.totalCost ? numberCurrencyFormat(product.totalCost) : '-' }/>
                    <div/>

                </SimpleGrid>
                <InfoCardSmall label={ i18n._(t`Marked labels`) }
                               alignSelfStretch={ true }
                               withBottomBorder={false}
                               content={ product?.markedLabels ?  product.markedLabels.join(' , ') : '-' }/>

            </Box>

            { isLoading && <LoaderOverlay/> }
        </>
    );

};

import React from 'react';
import { ActionIcon, Box, Flex, Input, rem, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import {  TrashIcon } from '@heroicons/react/24/outline';
import { useStyles } from './styles';
import { typeProductsInCartTable } from 'features/orders-create/ui/products-in-cart-table/types';
import { IMaskInput } from 'react-imask';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';


export const ProductsInCartTableEdit: React.FC<typeProductsInCartTable> = ({ form,orderData }) => {

    const { i18n } = useLingui();
    const { classes } = useStyles();
    const theme = useMantineTheme();

    const onDeleteHandler = (index: number) => {
        form.removeListItem('products', index);
    };
// ---------------------------------------------------------------------------------------------------------------------------------------

    return (
        <Flex className={ classes.tableWrapper }>
            <Box className={ classes.tableBorder }>
                <table>
                    <thead>
                    <tr>
                        <th>
                            <Flex wrap={ 'nowrap' } gap={ 9 } sx={ { maxWidth: '30px', } }>
                                <Box sx={ { borderRight: `1px solid ${ theme.colors.gray[3] }` } }>
                                    <Trans>N%</Trans>
                                </Box>
                            </Flex>
                        </th>
                        <th>
                            <Box sx={ {
                                minWidth: '170px',
                                textAlign: 'left'
                            } }>
                                <Box sx={ { borderRight: `1px solid ${ theme.colors.gray[3] }` } }>
                                    <Trans>Product name</Trans>
                                </Box>

                            </Box>

                        </th>
                        <th>
                            <Box sx={ {
                                minWidth: '107px',
                                lineHeight: '16px',
                                textAlign: 'left'
                            } }>
                                <Box sx={ { borderRight: `1px solid ${ theme.colors.gray[3] }` } }>
                                    <Trans>Quantity</Trans></Box>
                            </Box>
                        </th>

                        <th>
                            <Box sx={ {
                                minWidth: '100px',
                                lineHeight: '16px',
                                textAlign: 'left'
                            } }> <Box sx={ { borderRight: `1px solid ${ theme.colors.gray[3] }` } }>
                                <Trans>Unit price</Trans></Box></Box>
                        </th>
                        <th>
                            <Box sx={ {
                                lineHeight: '16px',
                                minWidth: '120px',
                                textAlign: 'left'
                            } }> <Box sx={ { borderRight: `1px solid ${ theme.colors.gray[3] }` } }>
                                <Trans>Cost</Trans></Box>
                            </Box>
                        </th>
                        <th>
                            <Box px={ 9 }><Trans>Actions</Trans></Box>
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    { form.values.products.length > 0 && form.values.products.map((item, index) => {

                        const isInSelectedStore = form.values.storeId === item.storeId;

                        const initProduct  = orderData.products.find(product=>product.id===item.id)

                        return (
                            <tr key={ item.id + index } className={ isInSelectedStore ? undefined : classes.disabledInCart } title={ isInSelectedStore ? undefined : i18n._(t`This item is not sold in the selected store`) }>
                                <td>
                                    <Box sx={ { maxWidth: '16px' } }> { index + 1 }</Box>

                                </td>
                                <td><Box sx={ {
                                    minWidth: rem(100),
                                    maxWidth: rem(170)
                                } }><Text truncate>{ item.product.name || '-' }</Text></Box></td>
                                <td><Flex wrap={ 'nowrap' } align={ 'center' } gap={ 6 } sx={ { maxWidth: 'fit-content' } }>
                                    <Input.Wrapper
                                        id={ 'change-amount-input-wrapper' }
                                        className={ classes.inputWrapper }
                                        required>
                                        <Input<any> // thousand separator work badly
                                            component={ IMaskInput }
                                            mask={ Number }
                                            scale={ 3 } // digits after point, 0 for integers
                                            padFractionalZeros={ false } // if true, then pads zeros at end to the length of scale
                                            normalizeZeros={ true } // appends or removes zeros at ends
                                            radix={ '.' } // fractional delimiter
                                            mapToRadix={ [ ',' ] } // symbols to process as radix
                                            placeholder={ '' }
                                            disabled={ !isInSelectedStore }
                                            // additional number interval stores (e.g.)
                                            min={ 0 }
                                            max={ initProduct.quantity ?? 0 }
                                            autofix={ true }

                                            id={ 'amount-input-change' + item.id }
                                            { ...form.getInputProps(`products.${ index }.amount`) }
                                            // value={ item.amount.toString() }
                                            // onAccept={ (value: string, mask: any) => {
                                            //    const newAmount = parseFloat(value);
                                            //     const newProduct =  {...item, amount: newAmount}
                                            //    form.setFieldValue(`products.${index}`, newProduct);
                                            // } }


                                        />

                                    </Input.Wrapper>
                                    <Box>{ item.product.unit.toLowerCase() }</Box>

                                </Flex>
                                    <div>{ +item.amount > +initProduct.quantity ? 'The value must be less ' : null }</div>
                                </td>

                                <td><Box sx={ { width: rem(110), } }>{ item.price ? numberCurrencyFormat(item.price) : '-' }</Box></td>
                                <td><Box sx={ { width: rem(110), } }>{ (item.price && !isNaN(parseFloat(item.amount))) ? numberCurrencyFormat(item.price * parseFloat(item.amount)) : '-' }</Box></td>


                                <td>
                                    <Flex justify={ 'center' }>
                                        <Tooltip withArrow arrowSize={ 6 } radius="md" label={ i18n._(t`Delete from cart`) }>
                                            <ActionIcon variant="subtle" onClick={ (e) => {

                                                e.stopPropagation();
                                                onDeleteHandler(index);

                                            } }>
                                                <TrashIcon color={ theme.colors.red[5] } width={ 22 }/>
                                            </ActionIcon>
                                        </Tooltip>
                                    </Flex>

                                </td>
                            </tr>
                        );

                    }) }
                    { form.values.products.length === 0 && <tr>
                        <td colSpan={ 6 }><Box><Trans>The list is empty</Trans></Box></td>
                    </tr> }
                    </tbody>

                </table>
                {form.errors.products && <Box sx={theme=>({color: theme.colors.red[5], fontSize: theme.fontSizes.lg, letterSpacing: 0.3})}>{form.errors.products}</Box>}
            </Box>
        </Flex>
    );

};

import React from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ArchiveBoxXMarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { FilterPanel } from 'shared/ui/filter-panel';
import { Table } from 'shared/ui/table/ui/table-new/table';
import { TableSkeleton } from 'shared/ui/table/ui/table-skeleton/tableSkeleton';
import { Pagination } from 'shared/ui/pagination/table-pagination';
import { Box, Checkbox, Flex, rem, Text, useMantineTheme } from '@mantine/core';
import { typeActionList } from 'shared/ui/table/ui/table-actions/types';
import { typeProductExtendedWithCheckBox, typeProductsListTable } from 'features/products-list/types/types';
import { typeProductAdditionalField } from '../../../../entities/products/model/state-slice/types';
import { useSelectorT } from 'app/state';
import { additionalFieldInTable } from '../../../../entities/products/constants/additional-field-in-table';
import { ProductsListFilter } from 'features/products-list-filter';
import { ProductsListTableHeader } from './products-table-header';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';

export const ProductsListTable: React.FC<typeProductsListTable> = ({
    isAllowedEdit,
    currentUser,
    goToEditProductPage,
    goToDetailsProductPage,
    onClickRowActionsArchiveItem,
    productsList,
    pagination,
    isLoading,
    headerActions,
    handlersListState,
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const additionalFields = useSelectorT(state => state.products.additionalFieldInfo);


    // observer for checkbox in header - if all checked
    const allChecked = (productsList && productsList.length > 0) ? productsList?.every((value) => value?.checked) : false;

    // observer for checkbox in header - if something checked
    const indeterminate = productsList?.some((value) => value?.checked) && !allChecked;

    const onCheckedAllHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

        event.stopPropagation();
        handlersListState.setState((current) => current.map((value) => ({
            ...value,
            checked: !allChecked,
        })));

    };

    const onCheckedItemHandler = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {

        event.stopPropagation();
        handlersListState.setItemProp(index, 'checked', event.currentTarget.checked);

    };

    return (<>
        <FilterPanel
            withFind={ { placeholder: i18n._(t`Type part of a product name`) } }
            filterComponent={ <ProductsListFilter/> }
        />

        { (isLoading)
            ? <TableSkeleton/>
            : productsList && <>
                <Table>
                    <ProductsListTableHeader
                        additionalFields={ additionalFields }
                        indeterminate={ indeterminate || false }
                        allChecked={ allChecked }
                        headerActions={ headerActions }
                        isAllowedEdit={ isAllowedEdit }
                        onCheckedAllHandler={ onCheckedAllHandler }/>

                    <Table.Body>
                        { productsList.length > 0 && productsList.map((item, index) => {

                            const actions: typeActionList = [
                                {
                                    label: i18n._(t`Edit`),
                                    handler: () => goToEditProductPage(item.id),
                                    icon: <PencilSquareIcon color={ theme.colors.primary[ 5 ] } width={ 22 }/>,
                                }
                            ];

                            actions.push({
                                label: i18n._(t`Archive`),
                                handler: () => onClickRowActionsArchiveItem(item),
                                icon: <ArchiveBoxXMarkIcon color={ theme.colors.primary[ 5 ] } width={ 22 }/>,
                            });

                            const firstColumnValue = item.productAdditionalFields.find((item: typeProductAdditionalField) => item.type === additionalFieldInTable);

                            const getPriceElement = (item: typeProductExtendedWithCheckBox) => {

                                if (item.minPrice && item.maxPrice) {

                                    return item.maxPrice === item.minPrice
                                        ? <Flex gap={ 10 } justify={ 'end' }> { item.minPrice || item.maxPrice || '' }</Flex>
                                        : <Box>
                                            <Flex gap={ 10 } justify={ 'end' }><Text span c={ theme.colors.gray[ 5 ] }><Trans>from</Trans></Text> { numberCurrencyFormat(item.minPrice || 0) }</Flex>
                                            <Flex gap={ 10 } justify={ 'end' }><Text span c={ theme.colors.gray[ 5 ] }><Trans>to</Trans></Text> { numberCurrencyFormat(item.maxPrice || 0) }</Flex>
                                        </Box>;

                                } else {

                                    return '';

                                }

                            };

                            return (
                                <Table.Tr key={ item.id } handler={ () => goToDetailsProductPage(item.id, item.name) }>
                                    <td onClick={ (event) => event.stopPropagation() } align={ 'center' } width={ 50 } style={ { cursor: 'auto' } }>

                                        <Checkbox size={ 'sm' }
                                            sx={ { '& input': { cursor: 'pointer' } } }
                                            checked={ item.checked }
                                            onChange={ (event) => onCheckedItemHandler(event, index) }/>

                                    </td>
                                    <Table.Td><Box sx={ { minWidth: rem(160) } }>{ firstColumnValue?.value || '-' }</Box></Table.Td>
                                    <Table.Td><Box sx={ { minWidth: rem(300) } }>{ item.name || '-' }</Box></Table.Td>
                                    <Table.Td><Box sx={ { width: rem(150) } }><Text truncate>{ item.productCategory?.name || '-' }</Text></Box></Table.Td>
                                    <Table.Td><Flex sx={ {
                                        minWidth: rem(160),
                                        flexDirection: 'column',
                                        alignItems: 'end',
                                    } }>{ getPriceElement(item) }</Flex>
                                    </Table.Td>
                                    <Table.Td align={ 'center' }><Box sx={ {
                                        minWidth: rem(80),
                                        textAlign: 'center',
                                    } }>{ item.storesCount }</Box></Table.Td>
                                    { isAllowedEdit && <Table.TdActions actions={ actions }/> }
                                </Table.Tr>
                            );

                        }) }
                        { productsList.length === 0 && <Table.EmptyRow columnCount={ isAllowedEdit ? 7 : 6 }>
                            <Trans>The list is empty, try changing your filtering or search conditions and try again.</Trans>
                        </Table.EmptyRow> }
                    </Table.Body>
                </Table>

                { pagination && <Pagination pagination={ pagination } withPerPage={ true }/> }
            </>
        }

    </>);

};

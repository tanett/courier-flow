import React, { useEffect, useState } from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ArchiveBoxXMarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { FilterPanel } from 'shared/ui/filter-panel';
import { Table } from 'shared/ui/table/ui/table-new/table';
import { TableSkeleton } from 'shared/ui/table/ui/table-skeleton/tableSkeleton';
import { Pagination } from 'shared/ui/pagination/table-pagination';
import { Box, Checkbox, rem, Text, useMantineTheme } from '@mantine/core';
import { typeAction } from 'shared/ui/table/ui/table-actions/types';
import { typeProductsListTable, typeProductWithCheckBox } from 'features/products-list/types/types';
import { typeProduct, typeProductAdditionalField } from '../../../../entities/products/model/state-slice/types';
import { useSelectorT } from 'app/state';
import { additionalFieldInTable } from '../../../../entities/products/constants/additional-field-in-table';
import { ProductsListFilter } from 'features/products-list-filter';
import { useListState } from '@mantine/hooks';
import { ProductsListTableHeader } from 'features/products-list/ui/table/products-table-header';

export const ProductsListTable: React.FC<typeProductsListTable> = ({
    isAllowedEdit,
    currentUser,
    goToEditProductPage,
    goToDetailsProductPage,
    onConfirmArchiveProduct,
    productsList,
    pagination,
    isLoading,
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const additionalFields = useSelectorT(state => state.products.additionalFieldInfo);

    const [ firstColumnName, setFirstColumnName ] = useState('');

    useEffect(() => {
        if (additionalFields) {
            setFirstColumnName(additionalFields.find(item => item.code === additionalFieldInTable)?.name || '');
        }
    }, [ additionalFields ]);

    // product list with checked
    const [ values, handlers ] = useListState<typeProductWithCheckBox>(undefined);

    useEffect(() => {
        if (productsList) {
            handlers.setState(productsList.map(item => ({
                ...item,
                checked: false
            })));
        }

    }, [ productsList ]);

    // observer for checkbox in header - if all checked
    const allChecked = values?.every((value) => value?.checked);

    // observer for checkbox in header - if something checked
    const indeterminate = values?.some((value) => value?.checked) && !allChecked;

    const onCheckedAllHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

        event.stopPropagation();
        handlers.setState((current) =>
            current.map((value) => ({
                ...value,
                checked: !allChecked
            }))
        );
    };

    const onCheckedItemHandler = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {

        event.stopPropagation();
        handlers.setItemProp(index, 'checked', event.currentTarget.checked);
    };

    return (<>
        <FilterPanel
            withFind={ { placeholder: i18n._(t`Type part of a product name`) } }
            filterComponent={ <ProductsListFilter/> }
        />

        { isLoading
            ? <TableSkeleton/>
            : values && <>
            <Table>
                <ProductsListTableHeader
                    additionalFields={ additionalFields }
                    indeterminate={ indeterminate }
                    allChecked={ allChecked }
                    headerActions={ [
                        {
                            id: 'selected-export-btn',
                            label: i18n._(t`Selected export`),
                            handler: (event) => console.log('click')
                        },
                        {
                            id: 'change-category-btn',
                            label: i18n._(t`Change category`),
                            handler: (event) => console.log('click')
                        },
                        {
                            id: 'selected-archive-btn',
                            label: i18n._(t`Move to archive`),
                            handler: (event) => console.log('click')
                        },
                    ] }
                    isAllowedEdit={ isAllowedEdit }
                    onCheckedAllHandler={ onCheckedAllHandler }/>

                <Table.Body>
                    { values.length > 0 && values.map((item, index) => {

                        const actions: typeAction[] = [
                            {
                                label: i18n._(t`Edit`),
                                handler: () => goToEditProductPage(item.id),
                                icon: <PencilSquareIcon color={ theme.colors.primary[5] } width={ 22 }/>,
                            }
                        ];

                        actions.push({
                            label: i18n._(t`Archive`),
                            handler: () => onConfirmArchiveProduct(item.id),
                            icon: <ArchiveBoxXMarkIcon color={ theme.colors.primary[5] } width={ 22 }/>,
                        });

                        const firstColumnValue = item.productAdditionalFields.find((item: typeProductAdditionalField) => item.type === additionalFieldInTable);

                        return (
                            <Table.Tr key={ item.id } handler={ () => goToDetailsProductPage(item.id, item.name) }>
                                <td onClick={ (event) => event.stopPropagation() } align={ 'center' } width={ 50 } style={ { cursor: 'auto' } }>

                                    <Checkbox size={ 'sm' }
                                              sx={ { '& input': { cursor: 'pointer' } } }
                                              checked={ item.checked }
                                              onChange={ (event) => onCheckedItemHandler(event, index) }/>

                                </td>
                                <Table.Td><Box sx={ { minWidth: rem(160) } }>{ firstColumnValue?.value || '-' }</Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(160) } }>{ item.name || '-' }</Box></Table.Td>
                                <Table.Td><Box sx={ { width: rem(114) } }><Text truncate>{ item.productCategory?.name || '-' }</Text></Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(160) } }>{ '-' }</Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(160) } }>{ '- ' }</Box></Table.Td>
                                { isAllowedEdit && <Table.TdActions actions={ actions }/> }
                            </Table.Tr>
                        );

                    }) }
                    { values.length === 0 && <Table.EmptyRow columnCount={ isAllowedEdit ? 7 : 6 }>
                        <Trans>The list is empty, try changing your filtering or search conditions and try again.</Trans>
                    </Table.EmptyRow> }
                </Table.Body>
            </Table>

            { pagination && <Pagination pagination={ pagination } withPerPage={ pagination.totalPages > 1 }/> }
        </>
        }

    </>);

};

import React, { useEffect, useState } from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ArchiveBoxXMarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { FilterPanel } from '../../../shared/ui/filter-panel';
import { Table } from '../../../shared/ui/table/ui/table-new/table';
import { TableSkeleton } from '../../../shared/ui/table/ui/table-skeleton/tableSkeleton';
import { Pagination } from '../../../shared/ui/pagination/table-pagination';
import { Box, rem, Text, useMantineTheme } from '@mantine/core';
import { typeAction } from '../../../shared/ui/table/ui/table-actions/types';
import { typeProductsListTable } from 'features/products-list/types/types';
import { TYPE_PRODUCT_ADDITIONAL_FIELD, typeProduct, typeProductAdditionalField } from '../../../entities/products/model/state-slice/types';
import { useSelectorT } from 'app/state';
import { additionalFieldInTable } from '../../../entities/products/constants/additional-field-in-table';

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

    const [firstColumnName, setFirstColumnName] = useState('')

    useEffect(() => {
        if(additionalFields){
            setFirstColumnName(additionalFields.find(item=>item.code === additionalFieldInTable)?.name || '')
        }
    }, [additionalFields]);

    return (<>
        <FilterPanel
            withFind={ { placeholder: i18n._(t`Type part of a product name`) } }
            //  filterComponent={ <UserListFilter/> }
        />

        { isLoading
            ? <TableSkeleton/>
            : productsList && <>
            <Table>
                <Table.Header>
                    <Table.Th withoutLeftDivider>
                        {firstColumnName}
                    </Table.Th>
                    <Table.Th>
                        <Trans>Name</Trans>
                    </Table.Th>
                    <Table.Th>
                        <Trans>Category</Trans>
                    </Table.Th>
                    <Table.Th>
                        <Trans>Range of price</Trans>
                    </Table.Th>
                    <Table.Th>
                        <Trans>Amount of stores</Trans>
                    </Table.Th>
                    { isAllowedEdit && <Table.Th>
                        <Trans>Actions</Trans>
                    </Table.Th> }
                </Table.Header>

                <Table.Body>
                    { productsList.length > 0 && productsList.map(item => {

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

                        const firstColumnValue = item.productAdditionalFields.find((item: typeProductAdditionalField )=> item.type === additionalFieldInTable);

                        return (
                            <Table.Tr key={ item.id } handler={ () => goToDetailsProductPage(item.id, item.name) }>
                                <Table.Td><Box sx={ { minWidth: rem(160) } }>{ firstColumnValue?.value || '-' }</Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(160) } }>{ item.name || '-' }</Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(160) } }>{ item.productCategory.name || '-' }</Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(160) } }>{ '-' }</Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(160) } }>{ '- ' }</Box></Table.Td>
                                { isAllowedEdit && <Table.TdActions actions={ actions }/> }
                            </Table.Tr>
                        );

                    }) }
                    { productsList.length === 0 && <Table.EmptyRow columnCount={ isAllowedEdit ? 6 : 5 }>
                        <Trans>The list is empty, try changing your filtering or search conditions and try again.</Trans>
                    </Table.EmptyRow> }
                </Table.Body>
            </Table>

            { pagination && <Pagination pagination={ pagination } withPerPage={ pagination.totalPages > 1 }/> }
        </>
        }

    </>);

};

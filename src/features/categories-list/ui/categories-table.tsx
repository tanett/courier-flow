import React from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ArchiveBoxXMarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { FilterPanel } from '../../../shared/ui/filter-panel';
import { Table } from '../../../shared/ui/table/ui/table-new/table';
import { TableSkeleton } from '../../../shared/ui/table/ui/table-skeleton/tableSkeleton';
import { Pagination } from '../../../shared/ui/pagination/table-pagination';
import { Box, rem, Text, useMantineTheme } from '@mantine/core';
import { typeAction } from '../../../shared/ui/table/ui/table-actions/types';
import { typeCategoriesListTable } from 'features/categories-list/types/types';

export const CategoriesListTable: React.FC<typeCategoriesListTable> = ({
    isAllowedCategoryEdit,
    currentUser,
    goToEditCategoryPage,
    onConfirmArchiveCategory,
    categoriesList,
    pagination,
    isLoading,
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    return (<>
        <FilterPanel
            withFind={ { placeholder: i18n._(t`Type part of category name`) } }

        />

        { isLoading
            ? <TableSkeleton/>
            : categoriesList && <>
            <Table>
                <Table.Header>
                    <Table.Th withoutLeftDivider>
                        <Trans>Name</Trans>
                    </Table.Th>
                    <Table.Th>
                        <Trans>Number of products</Trans>
                    </Table.Th>
                    { isAllowedCategoryEdit && <Table.Th>
                        <Trans>Actions</Trans>
                    </Table.Th> }
                </Table.Header>

                <Table.Body>
                    { categoriesList.length > 0 && categoriesList.map(item => {

                        const actions: typeAction[] = [
                            {
                                label: i18n._(t`Edit`),
                                handler: () => goToEditCategoryPage(item.id),
                                icon: <PencilSquareIcon color={ theme.colors.primary[5] } width={ 22 }/>,
                            }
                        ];
                        if (currentUser?.actor.id !== item.id) {

                            actions.push({
                                label: i18n._(t`Archive`),
                                handler: () => onConfirmArchiveCategory(item.id),
                                icon: <ArchiveBoxXMarkIcon color={ theme.colors.primary[5] } width={ 22 }/>,
                            });

                        }

                        return (
                            <Table.Tr key={ item.id }>
                                <Table.Td><Box sx={ { minWidth: rem(160) } }>{ item.name }</Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(160) } }>{  '??' }</Box></Table.Td>
                                { isAllowedCategoryEdit && <Table.TdActions actions={ actions }/> }
                            </Table.Tr>
                        );

                    }) }
                    { categoriesList.length === 0 && <Table.EmptyRow columnCount={ isAllowedCategoryEdit ? 3 : 2 }>
                        <Trans>The list is empty, try changing your filtering or search conditions and try again.</Trans>
                    </Table.EmptyRow> }
                </Table.Body>
            </Table>

            { pagination && <Pagination pagination={ pagination } withPerPage={ pagination.totalPages > 1 }/> }
        </>
        }

    </>);

};

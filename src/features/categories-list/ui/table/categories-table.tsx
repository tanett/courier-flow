import React from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ArchiveBoxXMarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { FilterPanel } from 'shared/ui/filter-panel';
import { Table } from 'shared/ui/table/ui/table-new/table';
import { TableSkeleton } from 'shared/ui/table/ui/table-skeleton/tableSkeleton';
import { Pagination } from 'shared/ui/pagination/table-pagination';
import { Box, Checkbox, rem, useMantineTheme } from '@mantine/core';
import { typeAction } from 'shared/ui/table/ui/table-actions/types';
import { typeCategoriesListTable } from 'features/categories-list/types/types';
import { CategoriesListTableHeader } from 'features/categories-list/ui/table/categories-table-header';

export const CategoriesListTable: React.FC<typeCategoriesListTable> = ({
    isAllowedCategoryEdit,
    currentUser,
    goToEditCategoryPage,
    onClickRowActionsArchiveItem,
    categoriesList,
    handlersListState,
    pagination,
    isLoading,
    headerActions,
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();


    // observer for checkbox in header - if all checked
    const allChecked =(categoriesList && categoriesList.length>0 )? categoriesList.every((value) => value?.checked) : false;

    // observer for checkbox in header - if something checked
    const indeterminate =  (categoriesList?.some((value) => value?.checked) && !allChecked) || false;

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
            withFind={ { placeholder: i18n._(t`Type part of category name`) } }

        />

        { (isLoading || !categoriesList)
            ? <TableSkeleton/>
            : <>
                <Table>
                    <CategoriesListTableHeader
                        indeterminate={ indeterminate || false }
                        allChecked={ allChecked || false }
                        headerActions={ headerActions }
                        isAllowedEdit={ isAllowedCategoryEdit }
                        onCheckedAllHandler={ onCheckedAllHandler }/>

                    <Table.Body>
                        { categoriesList.length > 0 && categoriesList.map((item, index) => {

                            const actions: typeAction[] = [
                                {
                                    label: i18n._(t`Edit`),
                                    handler: () => goToEditCategoryPage(item.id),
                                    icon: <PencilSquareIcon color={ theme.colors.primary[ 5 ] } width={ 22 }/>,
                                }
                            ];
                            if (currentUser?.actor.id !== item.id) {

                                actions.push({
                                    label: i18n._( 'action-archive'),
                                    handler: () => onClickRowActionsArchiveItem(item),
                                    icon: <ArchiveBoxXMarkIcon color={ theme.colors.primary[ 5 ] } width={ 22 }/>,
                                });

                            }

                            return (
                                <Table.Tr key={ item.id }>
                                    <td onClick={ (event) => event.stopPropagation() } align={ 'center' } width={ 50 } style={ { cursor: 'auto' } }>

                                        <Checkbox size={ 'sm' }
                                            sx={ { '& input': { cursor: 'pointer' } } }
                                            checked={ item.checked }
                                            onChange={ (event) => onCheckedItemHandler(event, index) }/>

                                    </td>
                                    <Table.Td><Box sx={ { minWidth: rem(600) } }>{ item.name }</Box></Table.Td>
                                    <Table.Td><Box sx={ { minWidth: rem(160), textAlign: 'center' } } >{ item.productsCount }</Box></Table.Td>
                                    { isAllowedCategoryEdit && <Table.TdActions actions={ actions }/> }
                                </Table.Tr>
                            );

                        }) }
                        { categoriesList.length === 0 && <Table.EmptyRow columnCount={ isAllowedCategoryEdit ? 4 : 3 }>
                            <Trans>The list is empty, try changing your filtering or search conditions and try again.</Trans>
                        </Table.EmptyRow> }
                    </Table.Body>
                </Table>

                { pagination && <Pagination pagination={ pagination } withPerPage={ true }/> }
            </>
        }

    </>);

};

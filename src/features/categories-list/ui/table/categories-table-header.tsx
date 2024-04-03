import React from 'react';
import { Trans } from '@lingui/macro';
import { Table } from 'shared/ui/table/ui/table-new/table';
import { Checkbox, rem, UnstyledButton, useMantineTheme } from '@mantine/core';
import { typeCategoriesListTableHeader } from '../../types/types';


export const CategoriesListTableHeader: React.FC<typeCategoriesListTableHeader> = ({
    onCheckedAllHandler,
    indeterminate,
    allChecked,
    isAllowedEdit,
    headerActions
}) => {
    const theme = useMantineTheme();

    return (
        <Table.Header>
            <Table.Th withoutLeftDivider>
                <Checkbox
                    size={ 'sm' }
                    sx={ { '& input': { cursor: 'pointer' } } }
                    indeterminate={ indeterminate }
                    checked={ allChecked }
                    onChange={ (event) => onCheckedAllHandler(event) }
                />
            </Table.Th>
            { (indeterminate || allChecked)
                ? <>
                    { headerActions.map((actions, index) => (
                        <Table.Th  key={ index }>
                            <UnstyledButton
                                id={ actions.id }
                                onClick={ actions.handler }
                                sx={ {
                                    fontWeight: 600,
                                    fontSize: theme.fontSizes.md,
                                    letterSpacing: 0.3,
                                    lineHeight: '20px',
                                    color: theme.black,
                                    cursor: 'pointer',
                                    padding: '2px 4px',
                                    borderTopLeftRadius: rem(4),
                                    borderTopRightRadius: rem(4),
                                    textWrap: 'nowrap',
                                    borderBottom: '1px solid transparent',
                                    '&:hover': {
                                        backgroundColor: theme.fn.rgba(theme.colors.primary[5], 0.1),
                                        borderBottomColor: theme.colors.primary[3]
                                    }
                                } }
                            >
                                { actions.label }
                            </UnstyledButton>
                        </Table.Th>
                    )) }

                </>
                : <>
                    <Table.Th withoutLeftDivider>
                        <Trans id={'item-name'}>Name</Trans>
                    </Table.Th>
                    <Table.Th>
                        <Trans>Number of products</Trans>
                    </Table.Th>
                    { isAllowedEdit && <Table.Th>
                        <Trans>Actions</Trans>
                    </Table.Th> }
                </> }
        </Table.Header>
    );

};

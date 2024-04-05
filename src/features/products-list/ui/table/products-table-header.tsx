import React, { useEffect, useState } from 'react';
import { Trans } from '@lingui/macro';
import { Table } from 'shared/ui/table/ui/table-new/table';
import { Checkbox, rem, UnstyledButton, useMantineTheme } from '@mantine/core';
import { typeProductListTableHeader } from 'features/products-list/types/types';
import { additionalFieldInTable } from '../../../../entities/products/constants/additional-field-in-table';


export const ProductsListTableHeader: React.FC<typeProductListTableHeader> = ({
    onCheckedAllHandler,
    indeterminate,
    allChecked,
    additionalFields,
    isAllowedEdit,
    headerActions,
}) => {

    const theme = useMantineTheme();

    const [ firstColumnName, setFirstColumnName ] = useState('');

    useEffect(() => {

        if (additionalFields) {

            setFirstColumnName(additionalFields.find(item => item.code === additionalFieldInTable)?.name || '');

        }

    }, [ additionalFields ]);


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
                        <Table.Th key={ index }>
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
                                        backgroundColor: theme.fn.rgba(theme.colors.primary[ 5 ], 0.1),
                                        borderBottomColor: theme.colors.primary[ 3 ],
                                    },
                                } }
                            >
                                { actions.label }
                            </UnstyledButton>
                        </Table.Th>
                    )) }

                </>
                : <>
                    <Table.Th>
                        { firstColumnName }
                    </Table.Th>
                    <Table.Th>
                        <Trans id={ 'item-name' }>Name</Trans>
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
                    </Table.Th> }</> }
        </Table.Header>
    );

};

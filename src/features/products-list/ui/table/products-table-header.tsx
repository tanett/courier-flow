import React, { useEffect, useState } from 'react';
import { Trans } from '@lingui/macro';
import { Table } from 'shared/ui/table/ui/table-new/table';
import { Box, Checkbox, Divider, Flex, rem, UnstyledButton, useMantineTheme } from '@mantine/core';
import { typeProductListTableHeader } from 'features/products-list/types/types';
import { additionalFieldInTable } from '../../../../entities/products/constants/additional-field-in-table';
import SortButton from 'shared/ui/sort-button/sort-button';


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
                ? <Table.Th colSpan={isAllowedEdit ? 6 : 5 }>
                    <Flex sx={ { flexWrap: 'nowrap' } }>
                        { headerActions.map((actions, index) => (
                            <React.Fragment key={ actions.id }>
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
                                        padding: '6px 6px',
                                        marginLeft: index === 0 ? 0 : rem(16),
                                        marginRight: rem(16),
                                        borderTopLeftRadius: rem(4),
                                        borderTopRightRadius: rem(4),
                                        textWrap: 'nowrap',
                                        borderBottom: '1px solid transparent',
                                        '&:hover': { backgroundColor: theme.fn.rgba(theme.colors.primary[ 5 ], 0.1) },
                                    } }
                                >
                                    { actions.label }
                                </UnstyledButton>
                                { index < headerActions.length - 1 && <Divider orientation={'vertical'} sx={{ borderColor: theme.colors.borderColor[ 0 ] }}/> }
                            </React.Fragment>

                        )) }
                    </Flex>
                </Table.Th>

                : <>
                    <Table.Th>
                        { firstColumnName }
                    </Table.Th>
                    <Table.Th>
                        <Flex justify="space-between" gap={10} sx={{width: '100%'}}>
                            <Trans id={'item-name'}>Name</Trans>
                            <SortButton/>
                        </Flex>
                    </Table.Th>
                    <Table.Th>
                        <Trans>Category</Trans>
                    </Table.Th>
                    <Table.Th>
                        <Trans>Range of price</Trans>
                    </Table.Th>
                    <Table.Th>
                        <Box sx={{ lineHeight: '16px' }}>
                            <Trans>Amount of stores</Trans>
                        </Box>
                    </Table.Th>
                    { isAllowedEdit && <Table.Th>
                        <Trans>Actions</Trans>
                    </Table.Th> }</> }
        </Table.Header>
    );

};

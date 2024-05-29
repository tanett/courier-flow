import React from 'react';
import { Trans } from '@lingui/macro';
import { Table } from 'shared/ui/table/ui/table-new/table';
import { Checkbox, Divider, Flex, rem, UnstyledButton, useMantineTheme } from '@mantine/core';
import { typeCategoriesListTableHeader } from '../../types/types';
import SortButton from 'shared/ui/sort-button/sort-button';


export const CategoriesListTableHeader: React.FC<typeCategoriesListTableHeader> = ({
    onCheckedAllHandler,
    indeterminate,
    allChecked,
    isAllowedEdit,
    headerActions,
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
                ? <Table.Th colSpan={isAllowedEdit ? 3 : 2 }>
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
                    <Table.Th withoutLeftDivider>

                       <Flex justify="space-between" gap={10} sx={{width: '100%'}}>
                           <Trans id={'item-name'}>Name</Trans>
                           <SortButton/>
                       </Flex>
                    </Table.Th>
                    <Table.Th align={'center'}>
                        <Trans>Number of products</Trans>
                    </Table.Th>
                    { isAllowedEdit && <Table.Th>
                        <Trans>Actions</Trans>
                    </Table.Th> }
                </> }
        </Table.Header>
    );

};

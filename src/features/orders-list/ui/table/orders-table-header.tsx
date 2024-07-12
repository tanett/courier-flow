import React from 'react';
import { Trans } from '@lingui/macro';
import { Table } from 'shared/ui/table/ui/table-new/table';
import { Box, Divider, Flex, rem, UnstyledButton, useMantineTheme } from '@mantine/core';
import SortButton from 'shared/ui/sort-button/sort-button';
import { typeOrdersListTableHeader } from 'features/orders-list/types/types';
import { sortDirection } from 'app/api/types';


export const OrdersListTableHeader: React.FC<typeOrdersListTableHeader> = ({
    onCheckedAllHandler,
    indeterminate,
    allChecked,
    isAllowedEdit,
    headerActions,
}) => {

    const theme = useMantineTheme();


    return (
        <Table.Header>
            {/* <Table.Th withoutLeftDivider> */}
                {/* <Checkbox */}
                {/*     size={ 'sm' } */}
                {/*     sx={ { '& input': { cursor: 'pointer' } } } */}
                {/*     indeterminate={ indeterminate } */}
                {/*     checked={ allChecked } */}
                {/*     onChange={ (event) => onCheckedAllHandler(event) } */}
                {/* /> */}
            {/* </Table.Th> */}
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
                    <Table.Th withoutLeftDivider>
                        <Flex justify="space-between" gap={10} sx={{width: '100%',maxWidth: '140px', lineHeight: '16px' }}>
                            <Trans>Order&nbsp;number&nbsp;/
                                Date</Trans>
                            <SortButton initialSortDirection={sortDirection.dec}/>
                        </Flex>
                    </Table.Th>
                    <Table.Th>
                        <Box sx={{minWidth: '110px'}}>
                            <Trans>Assignee</Trans>
                        </Box>

                    </Table.Th>
                    <Table.Th>
                        <Box sx={{minWidth: '170px', lineHeight: '16px' }}>
                        <Trans>Store name</Trans>
                        </Box>
                    </Table.Th>
                    <Table.Th>
                        <Box sx={{minWidth: '110px', lineHeight: '16px' }}>
                            <Trans>Order amount</Trans></Box>
                    </Table.Th>
                    <Table.Th>
                        <Box sx={{ lineHeight: '16px', minWidth: '123px', }}>
                            <Trans>Client&nbsp;name&nbsp;/ Phone number</Trans>
                        </Box>
                    </Table.Th>
                    <Table.Th>
                        <Box sx={{ lineHeight: '16px', minWidth: '110px', }}>
                            <Trans>Courier</Trans></Box>
                    </Table.Th>
                    <Table.Th>
                        <Trans>Status</Trans>
                    </Table.Th>
                    { isAllowedEdit && <Table.Th>
                        <Trans>Actions</Trans>
                    </Table.Th> }</> }
        </Table.Header>
    );

};

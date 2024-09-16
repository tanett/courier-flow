import React from 'react';
import { Trans } from '@lingui/macro';
import { Table } from 'shared/ui/table/ui/table-new/table';
import { Box, Divider, Flex, rem, UnstyledButton, useMantineTheme } from '@mantine/core';
import SortButton from 'shared/ui/sort-button/sort-button';
import { typeOrdersListTableHeader } from 'features/orders-list/types/types';
import { sortDirection } from 'app/api/types';


export const OrdersListTableHeader: React.FC<typeOrdersListTableHeader> = ({ isAllowedEdit,}) => {

    return (
        <Table.Header>
            <Table.Th withoutLeftDivider>
                <Flex justify="space-between" gap={ 10 } sx={ {
                    width: '100%',
                    maxWidth: '140px',
                    lineHeight: '16px'
                } }>
                    <Trans>Order&nbsp;number&nbsp;/
                        Date</Trans>
                    <SortButton initialSortDirection={ sortDirection.dec }/>
                </Flex>
            </Table.Th>
            {/* <Table.Th> */ }
            {/*     <Box sx={{minWidth: '110px', textAlign: 'left'}}> */ }
            {/*         <Trans>Assignee</Trans> */ }
            {/*     </Box> */ }

            {/* </Table.Th> */ }
            <Table.Th>
                <Box sx={ {
                    minWidth: '170px',
                    lineHeight: '16px',
                    textAlign: 'left'
                } }>
                    <Trans>Store</Trans>
                </Box>
            </Table.Th>
            <Table.Th>
                <Box sx={ {
                    minWidth: '110px',
                    lineHeight: '16px',
                    textAlign: 'left'
                } }>
                    <Trans>Order amount</Trans></Box>
            </Table.Th>
            <Table.Th>
                <Box sx={ {
                    lineHeight: '16px',
                    minWidth: '123px',
                    textAlign: 'left'
                } }>
                    <Trans>Client /<br/> Phone number</Trans>
                </Box>
            </Table.Th>
            <Table.Th>
                <Trans>Status</Trans>
            </Table.Th>
            { isAllowedEdit && <Table.Th align={ 'center' }>
                <Trans>Actions</Trans>
            </Table.Th> }
        </Table.Header>
    );

};

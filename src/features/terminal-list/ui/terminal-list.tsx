import React from 'react';
import { TableSkeleton } from '../../../shared/ui/table/ui/table-skeleton/tableSkeleton';
import { Table } from '../../../shared/ui/table/ui/table-new/table';
import { t, Trans } from '@lingui/macro';
import BadgeStatus from '../../../shared/ui/badgeStatus/badgeStatus';
import { i18n } from '@lingui/core';
import { Box } from '@mantine/core';
import { useTerminalList } from '../hooks/use-terminal-list';
import { Pagination } from '../../../shared/ui/pagination/table-pagination';
import { FilterPanel } from 'shared/ui/filter-panel';
import { TerminalsListFilter } from 'features/terminals-list-filter';

export const TerminalList: React.FC = () => {

   const {
       terminalsList,
       pagination,
     //  setRefetch,
       isFetching
   } = useTerminalList()


    return (<>
        {isFetching
            ? <TableSkeleton/>
            : terminalsList && <>
            <FilterPanel
            // withFind={ { placeholder: i18n._(t`Type part of serial number, fiscal card Id`) } }
                filterComponent={ <TerminalsListFilter/> }
            />
                <Table variant="inTab">
                    <Table.Header>
                        <Table.Th withoutLeftDivider>
                            <Trans>Serial number</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Fiscal ID</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Merchant</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Creation date</Trans>
                        </Table.Th>
                        <Table.Th>
                            <Trans>Status</Trans>
                        </Table.Th>
                    </Table.Header>

                    <Table.Body>
                        {terminalsList.length > 0 && terminalsList.map((item) => {

                            const createdDate = new Date(item.createdAt);
                            const status = item.blocked
                                ? <BadgeStatus type={'error'} label={i18n._(t`Blocked`)}/>
                                : <BadgeStatus type={'success'} label={i18n._(t`Active`)}/>;


                            return (
                                <Table.Tr key={item.id} handler={() => console.log('######', item.id)}>
                                    <Table.Td>{item.serialNumber}</Table.Td>
                                    <Table.Td>
                                        <Box maw={200} miw={150} sx={{ wordBreak: 'break-all' }}>{item.fiscalCardId}</Box>
                                    </Table.Td>
                                    <Table.Td>{item.merchantName}</Table.Td>
                                    <Table.Td>{createdDate.toLocaleDateString(undefined, { day: 'numeric', month: 'numeric', year: 'numeric' })}</Table.Td>
                                    <Table.Td>{status}</Table.Td>
                                </Table.Tr>
                            );

                        })}

                        {terminalsList.length === 0 && <Table.EmptyRow columnCount={6}>
                            <Trans>The list is empty, try changing your filtering or search conditions and try again.</Trans>
                        </Table.EmptyRow>}
                    </Table.Body>
                </Table>

             <Pagination pagination={ pagination } withPerPage={pagination ? pagination.totalPages > 1 : false}/>
            </>
        }
    </>);

};

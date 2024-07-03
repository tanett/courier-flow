import React from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Table } from 'shared/ui/table/ui/table-new/table';
import { TableSkeleton } from 'shared/ui/table/ui/table-skeleton/tableSkeleton';
import { Pagination } from 'shared/ui/pagination/table-pagination';
import { Box, Flex, rem, Text, useMantineTheme } from '@mantine/core';
import { FilterPanel } from 'shared/ui/filter-panel';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import dayjs from 'dayjs';
import { typeCreditsListTable } from 'features/credits-list/types/types';
import SortButton from 'shared/ui/sort-button/sort-button';
import BadgeStatus from 'shared/ui/badge-status/badge-status';
import { CREDITS_SORTING_NAME } from '../../../../entities/credits/api/types';
import { sortDirection } from 'app/api/types';
import { CreditsListFilter } from 'features/credits-list-filter';

export const CreditsListTable: React.FC<typeCreditsListTable> = ({
    creditsList,
    goToDetailsPage,
    pagination,
    isLoading,
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    return (<>
        <FilterPanel
            withFind={ { placeholder: i18n._(t`Search by sale ID or credit amount`) } }
            filterComponent={ <CreditsListFilter/> }
        />

        { isLoading
            ? <TableSkeleton/>
            : creditsList && <>
            <Table>
                <Table.Header>
                    <Table.Th>
                        <Flex justify="space-between" gap={ 10 } sx={ {
                            width: '100%',
                            lineHeight: '16px',
                            alignItems: 'center'
                        } }>
                            <Trans>Date & time </Trans>
                             <SortButton sortName={CREDITS_SORTING_NAME.CREATED_ON_TERMINAL_AT} isDefaultSorting={true} initialSortDirection={sortDirection.dec}/>
                        </Flex>
                    </Table.Th>
                    <Table.Th>
                        <Box sx={ {
                            lineHeight: '16px',
                            textAlign: 'left'
                        } }>
                            <Trans>Store name</Trans>
                        </Box>
                    </Table.Th>
                    <Table.Th>
                        <Box sx={ { lineHeight: '16px' } }>
                            <Trans>Terminal SN</Trans>
                        </Box>
                    </Table.Th>
                    <Table.Th align={ 'center' }>
                        <Box sx={ { lineHeight: '16px' } }>
                            <Trans>Sale ID</Trans>
                        </Box>
                    </Table.Th>
                    <Table.Th>
                        <Flex justify="space-between" gap={ 10 } sx={ { width: '100%', alignItems: 'center' } }>
                            <Trans>Amount</Trans>
                            <SortButton sortName={CREDITS_SORTING_NAME.AMOUNT}/>
                        </Flex>

                    </Table.Th>
                    <Table.Th>
                        <Trans>Paid</Trans>
                    </Table.Th>
                    <Table.Th>

                        <Flex justify="space-between" gap={ 10 } sx={ { width: '100%', alignItems: 'center' } }>
                            <Trans>Rest</Trans>
                            <SortButton sortName={CREDITS_SORTING_NAME.NOT_PAID_AMOUNT}/>
                        </Flex>
                    </Table.Th>
                    <Table.Th>
                        <Trans>State</Trans>
                    </Table.Th>
                </Table.Header>

                <Table.Body>
                    { creditsList.length > 0 && creditsList.map((item,) => {

                        const data = (date: string) => {
                            const dateStr = dayjs(date).format('DD.MM.YYYY');
                            const timeStr = dayjs(date).format('HH:mm:ss');
                            return (<Flex gap={ 10 } align={ 'center' }>
                                <Text sx={ { lineHeight: rem(20) } }>{ dateStr },</Text>
                                <Text sx={ {
                                    color: theme.colors.gray[5],
                                    fontWeight: 400,
                                    lineHeight: rem(16)
                                } }>{ timeStr }</Text>

                            </Flex>);
                        };

                        const status = item.status === 'NOT_PAID'
                            ? <BadgeStatus type={ 'error' } label={ i18n._(t`Not paid`) }/>
                            : <BadgeStatus type={ 'success' } label={ i18n._(t`Paid`) }/>;
                        return (
                            <Table.Tr key={ item.id } handler={ () => goToDetailsPage(item.id) }>
                                <Table.Td><Box sx={ {
                                    minWidth: rem(130),
                                    maxWidth: rem(130)
                                } }>{ data(item.createdAt) }</Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(170) } }><Text truncate>{ item.storeName || '-' }</Text></Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(110), maxWidth: rem(150) } }>{ item.terminalSerialNumber || '-' }</Box></Table.Td>
                                <Table.Td align={'center'}><Flex justify={'center'} sx={ { minWidth: rem(110),maxWidth: rem(150) } }>{ item.salePublicId }</Flex></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(110) } }>{ numberCurrencyFormat(item.amount || 0) }</Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(110) } }>{ numberCurrencyFormat(item.paidAmount || 0) }</Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(110) } }>{ numberCurrencyFormat(item.notPaidAmount || 0) }</Box></Table.Td>
                                <Table.Td>{ status }</Table.Td>

                            </Table.Tr>
                        );

                    }) }
                    { creditsList.length === 0 && <Table.EmptyRow columnCount={ 8 }>
                        <Trans>The list is empty, try changing your filtering or search conditions and try again.</Trans>
                    </Table.EmptyRow> }
                </Table.Body>
            </Table>

            { pagination && <Pagination pagination={ pagination } withPerPage={ true }/> }
        </>
        }

    </>);

};

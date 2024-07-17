import React from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Table } from 'shared/ui/table/ui/table-new/table';
import { TableSkeleton } from 'shared/ui/table/ui/table-skeleton/tableSkeleton';
import { Pagination } from 'shared/ui/pagination/table-pagination';
import { Box, rem, useMantineTheme, Text, Flex } from '@mantine/core';
import { typeActionList } from 'shared/ui/table/ui/table-actions/types';
import { FilterPanel } from 'shared/ui/filter-panel';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import PaymentsList from 'shared/ui/payments/payments-list';
import { ReceiptIcon } from 'shared/images/icons/receipt';
import { typeAdvancesListTable } from 'features/advances-list/types/types';
import { AdvancesListFilter } from 'features/advances-list-filter';
import DateTimeInLine from 'shared/ui/date-time-in-line/date-time-in-line';

export const AdvancesListTable: React.FC<typeAdvancesListTable> = ({
    advancesList,
    goToDetailsPage,
    pagination,
    isLoading,
    onOpenReceipt
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    return (<>
        <FilterPanel
            withFind={ { placeholder: i18n._(t`Search by advance total cost`) } }
            filterComponent={ <AdvancesListFilter/> }
        />

        { isLoading
            ? <TableSkeleton/>
            : advancesList && <>
            <Table>
                <Table.Header>
                    <Table.Th>
                        <Flex justify="space-between" gap={ 10 } sx={ {
                            width: '100%',
                            lineHeight: '16px',
                            alignItems: 'center'
                        } }>
                            <Trans>Date & time </Trans>
                            {/* <SortButton/> */ }
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
                            <Trans>Employee</Trans>
                        </Box>
                    </Table.Th>
                    <Table.Th align={ 'center' }>
                        <Box sx={ { lineHeight: '16px' } }>
                            <Trans>Receipt position number</Trans>
                        </Box>
                    </Table.Th>
                    <Table.Th>
                        <Box sx={ { lineHeight: '16px' } }>
                            <Trans>Total cost</Trans>
                        </Box>
                    </Table.Th>
                    <Table.Th>
                        <Trans>Payment</Trans>
                    </Table.Th>
                    { <Table.Th>
                        <Trans>Actions</Trans>
                    </Table.Th> }
                </Table.Header>

                <Table.Body>
                    { advancesList.length > 0 && advancesList.map((item,) => {

                        const actions: typeActionList = [
                            {
                                label: i18n._(t`Receipt`),
                                handler: () => onOpenReceipt(item.id),
                                icon: <ReceiptIcon color={ theme.colors.primary[4] } width={ 22 } height={ 22 }/>,
                            },

                        ];

                        return (
                            <Table.Tr key={ item.id } handler={ () => goToDetailsPage(item.id) }>
                                <Table.Td><Box sx={ {
                                    minWidth: rem(70),
                                    maxWidth: rem(130)
                                } }>{ item.createdAt? <DateTimeInLine date={ item.createdAt } fontSizeDate={'14px'} fontSizeTime={'14px'} fontWeightDate={500}/>: '-' }</Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(100),wordBreak: 'break-all',maxWidth: rem(170)  } }><Text truncate>{ item.storeName }</Text></Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(100),wordBreak: 'break-all',maxWidth: rem(170)  } }>{ item.createdOnTerminalByName }</Box></Table.Td>
                                <Table.Td align={ 'center' }><Flex justify={ 'center' } sx={ { maxWidth: rem(132) } }>{ item.productsCount }</Flex></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(110) } }>{ numberCurrencyFormat(item.totalCost) }</Box></Table.Td>
                                <Table.Td><Box sx={ { minWidth: rem(110) } }><PaymentsList sale={ item }/></Box></Table.Td>
                                <Table.TdActions actions={ actions } align={ 'center' }/>
                            </Table.Tr>
                        );

                    }) }
                    { advancesList.length === 0 && <Table.EmptyRow columnCount={ 7 }>
                        <Trans>The list is empty, try changing your filtering or search conditions and try again.</Trans>
                    </Table.EmptyRow> }
                </Table.Body>
            </Table>

            { pagination && <Pagination pagination={ pagination } withPerPage={ true }/> }
        </>
        }

    </>);

};

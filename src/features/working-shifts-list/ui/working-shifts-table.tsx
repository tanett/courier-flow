import React from 'react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { FilterPanel } from '../../../shared/ui/filter-panel';
import { Table } from '../../../shared/ui/table';
import { TableSkeleton } from '../../../shared/ui/table/ui/table-skeleton/tableSkeleton';
import { Pagination } from '../../../shared/ui/pagination/table-pagination';
import { Box, Flex, useMantineTheme, Text } from '@mantine/core';
import { typeWorkingShiftsTable } from '../types/types';
import { useStyles } from './styles';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import { WorkingShiftsListFilter } from 'features/working-shifts-list-filter/ui/working-shifts-list-filter';
import DateTimeInLine from 'shared/ui/date-time-in-line/date-time-in-line';
import { getCashlessSalePayments } from '../../../entities/working-shifts/helpers/get-cashless-sale-payments';
import { getAmountSalePayments } from '../../../entities/working-shifts/helpers/get-amount-sale-payments';
import { getCashlessRefunds } from '../../../entities/working-shifts/helpers/get-cashless-refunds';
import { getAmountRefunds } from '../../../entities/working-shifts/helpers/get-amount-refunds';
import { getTotalCost } from '../../../entities/working-shifts/helpers/get-total-cost';
import PaymentMethodIcon from 'shared/ui/payment-method-icon/payment-method-icon';

export const WorkingShiftsTable: React.FC<typeWorkingShiftsTable> = ({
    list,
    goToDetailsPage,
    pagination,
    isLoading,
}) => {

    const { classes } = useStyles();

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    return (<>
        <FilterPanel
            withFind={ {
                placeholder: i18n._(t`Search by terminal SN`),
                minValueLength: 1
            } }
            filterComponent={ <WorkingShiftsListFilter/> }
        />

        { isLoading
            ? <TableSkeleton/>
            : list && <>
            <Table>
                <Table.Header>
                    <Table.Th withoutLeftDivider>
                        <Trans>Date</Trans>
                    </Table.Th>
                    <Table.Th>
                        <Box sx={ {
                            lineHeight: '16px',
                            minWidth: '123px'
                        } }>
                            <Trans>Store name /
                                Terminal SN</Trans>
                        </Box>
                    </Table.Th>
                    <Table.Th>
                        <Trans>Cashier</Trans>
                    </Table.Th>
                    <Table.Th>
                        <Box sx={ {
                            lineHeight: '16px',
                            minWidth: '123px'
                        } }>
                            <Trans>Number of sales /
                                Number of returns</Trans>
                        </Box>
                    </Table.Th>
                    <Table.Th>
                        <Box sx={ {
                            lineHeight: '16px',
                            minWidth: '123px'
                        } }>
                            <Trans>Cash payment /
                                Cashless payment</Trans>
                        </Box>
                    </Table.Th>
                    <Table.Th>
                        <Box sx={ {
                            lineHeight: '16px',
                            minWidth: '123px'
                        } }>
                            <Trans>Sales amount</Trans>
                        </Box>
                    </Table.Th>
                    <Table.Th>
                        <Box sx={ {
                            lineHeight: '16px',
                            minWidth: '123px'
                        } }>
                            <Trans>Cash refunds /
                                Cashless refunds</Trans>
                        </Box>
                    </Table.Th>
                    <Table.Th>
                        <Box sx={ { lineHeight: '16px' } }>
                            <Trans>Return amount</Trans>
                        </Box>
                    </Table.Th>
                    <Table.Th>
                        <Box sx={ { lineHeight: '16px' } }>
                            <Trans>Total cost</Trans>
                        </Box>
                    </Table.Th>

                </Table.Header>

                <Table.Body>
                    { list.length > 0 && list.map(item => {

                        return (
                            <Table.Tr key={ item.id } handler={ () => goToDetailsPage(item.id) }>
                                <Table.Td>
                                    <Flex direction={ 'column' } sx={ {
                                        maxWidth: '180px',
                                        minWidth: '175px'
                                    } }>
                                        <Flex gap={ 4 } align={ 'center' } sx={ {
                                            borderBottom: `1ps solid ${ theme.colors.gray[3] }`,
                                            flexWrap: 'wrap'
                                        } }>
                                            <Text className={ classes.grayTextSize12 }><Trans>started</Trans>: </Text> <DateTimeInLine date={ item.openedAt } fontWeightDate={ 500 } fontSizeDate={ '14px' }/>
                                        </Flex>
                                        <Flex gap={ 4 } align={ 'center' } sx={ { flexWrap: 'wrap' } }>
                                            <Text className={ classes.grayTextSize12 }><Trans>closed</Trans>: </Text><DateTimeInLine date={ item.closedAt } fontWeightDate={ 500 } fontSizeDate={ '14px' }/>
                                        </Flex>
                                    </Flex>
                                </Table.Td>
                                <Table.Td>
                                    <Flex direction={ 'column' } sx={ {
                                        maxWidth: '123px',
                                        flexGrow: 1
                                    } }>
                                        <Flex gap={ 10 } align={ 'center' } sx={ {
                                            borderBottom: `1px solid ${ theme.colors.gray[3] }`,
                                            wordBreak: 'break-all',
                                            maxWidth: '100%'
                                        } }>
                                            <Text truncate>{ item.storeName }</Text>
                                        </Flex>
                                        <Flex gap={ 10 } align={ 'center' } sx={{color: theme.colors.gray[5]}}>
                                            { item.terminalSerialNumber }
                                        </Flex>
                                    </Flex></Table.Td>
                                <Table.Td><Box sx={ {
                                    maxWidth: '120px',
                                    minWidth: '100px',
                                    wordBreak: 'break-all'
                                } }><Text truncate>{ item.cashierName }</Text></Box> </Table.Td>
                                <Table.Td>
                                    <Flex direction={ 'column' } sx={ {
                                        maxWidth: '140px',
                                        minWidth: '140px',
                                        flexGrow: 1
                                    } }>
                                        <Flex gap={ 10 } align={ 'center' } sx={ {
                                            borderBottom: `1px solid ${ theme.colors.gray[3] }`,
                                            wordBreak: 'break-all',
                                            maxWidth: '100%'
                                        } }>
                                            {item.salesCount ? item.salesCount : '0'}
                                        </Flex>
                                        <Flex gap={ 10 } align={ 'center' } sx={{color: theme.colors.gray[5]}}>
                                            { item.refundsCount ? item.refundsCount : '0' }
                                        </Flex>
                                    </Flex>
                                  </Table.Td>
                                <Table.Td>
                                    <Flex direction={ 'column' } sx={ {
                                        maxWidth: '140px',
                                        minWidth: '140px',
                                        flexGrow: 1
                                    } }>
                                        <Flex gap={ 10 } align={ 'center' } sx={ {
                                            borderBottom: `1px solid ${ theme.colors.gray[3] }`,
                                            wordBreak: 'break-all',
                                            maxWidth: '100%',
                                            color: theme.colors.gray[5]
                                        } }>
                                           <PaymentMethodIcon method={'CASH'} /> { item.totalCashIncome ? numberCurrencyFormat(item.totalCashIncome ) : '-' }
                                        </Flex>
                                        <Flex gap={ 10 } align={ 'center' } sx={{color: theme.colors.gray[5]}}>
                                            <PaymentMethodIcon method={'All_CASHLESS'}/>{ getCashlessSalePayments(item) === 0? '-': numberCurrencyFormat(getCashlessSalePayments(item)) }
                                        </Flex>
                                    </Flex>
                                   </Table.Td>
                                <Table.Td >{ numberCurrencyFormat(getAmountSalePayments(item)) }</Table.Td>
                                <Table.Td>
                                    <Flex direction={ 'column' } sx={ {
                                        maxWidth: '140px',
                                        minWidth: '140px',
                                        flexGrow: 1
                                    } }>
                                        <Flex gap={ 10 } align={ 'center' } sx={ {
                                            borderBottom: `1px solid ${ theme.colors.gray[3] }`,
                                            wordBreak: 'break-all',
                                            maxWidth: '100%',
                                            color: theme.colors.gray[5]
                                        } }>
                                            <PaymentMethodIcon method={'CASH'} />  { item.totalCashRefunds ? numberCurrencyFormat(item.totalCashRefunds ) : '-' }
                                        </Flex>
                                        <Flex gap={ 10 } align={ 'center' } sx={{color: theme.colors.gray[5]}}>
                                            <PaymentMethodIcon method={'All_CASHLESS'}/>{getCashlessRefunds(item) === 0? '-': numberCurrencyFormat(getCashlessRefunds(item)) }
                                        </Flex>
                                    </Flex>
                                </Table.Td>
                                <Table.Td>{ numberCurrencyFormat(getAmountRefunds(item)) }</Table.Td>
                                <Table.Td>{ numberCurrencyFormat(getTotalCost(item)) }</Table.Td>

                            </Table.Tr>
                        );

                    }) }
                    { list.length === 0 && <Table.EmptyRow columnCount={ 9 }>
                        <Trans>The list is empty, try changing your filtering or search conditions and try again.</Trans>
                    </Table.EmptyRow> }
                </Table.Body>
            </Table>

            { pagination && <Pagination pagination={ pagination } withPerPage={ true }/> }
        </>
        }

    </>);

};

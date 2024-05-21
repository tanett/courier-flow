import React from 'react';
import { Box, Flex, rem, Text, useMantineTheme } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t, Trans } from '@lingui/macro';
import { TableSkeleton } from 'shared/ui/table/ui/table-skeleton/tableSkeleton';
import { EmptyElement } from 'shared/ui/empty-element';
import { Table } from 'shared/ui/table/ui/table-new/table';
import dayjs from 'dayjs';
import { typePaymentsTable } from './types';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import PaymentMethodIcon from 'shared/ui/payment-method-icon/payment-method-icon';
import { getTranslatedVariantForPaymentsMethod } from '../../../../entities/sales/helpers/get-translated-variant-for-payments-method';


export const TablePayments: React.FC<typePaymentsTable> = ({
    paymentsList,
    isLoading,
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const data = (date: string) => {
        const dateStr = dayjs(date).format('DD.MM.YYYY');
        const timeStr = dayjs(date).format('HH:mm:ss');
        return (<Box>
            <Text sx={ { lineHeight: rem(20) } }>{ dateStr }</Text>
            <Text sx={ {
                color: theme.colors.gray[5],
                fontWeight: 400,
                lineHeight: rem(16)
            } }>{ timeStr }</Text>

        </Box>);
    };

    return (
        <>
            { (isLoading || !paymentsList)
                ? <TableSkeleton/>
                : paymentsList.length === 0
                    ? <EmptyElement
                        title1={ i18n._(t`The list of payments is empty.`) }/>
                    : paymentsList && <>
                    <Table variant="inTab">
                        <Table.Header>
                            <Table.Th withoutLeftDivider>
                                <Box sx={ { lineHeight: '16px' } }>
                                    <Trans>Date & time </Trans>
                                </Box>
                            </Table.Th>
                            <Table.Th>
                                <Box sx={ { lineHeight: '16px' } }>
                                    <Trans>Amount of payment</Trans>
                                </Box>
                            </Table.Th>
                            <Table.Th>
                                <Box sx={ { lineHeight: '16px' } }>
                                    <Trans>Payment method</Trans>
                                </Box>
                            </Table.Th>
                            <Table.Th>
                                <Trans>RRN</Trans>
                            </Table.Th>
                            <Table.Th>
                                <Trans>STAN</Trans>
                            </Table.Th>
                            <Table.Th>
                                <Box sx={ { lineHeight: '16px' } }>
                                    <Trans>Transaction number</Trans>
                                </Box>
                            </Table.Th>
                        </Table.Header>

                        <Table.Body>
                            { paymentsList.map((item) => {

                                return (
                                    <Table.Tr key={ item.id }>
                                        <Table.Td><Box maw={ 400 } sx={ { wordBreak: 'break-all' } }>{ data(item.createdOnTerminalAt) }</Box></Table.Td>
                                        <Table.Td><Box maw={ 186 } sx={ { wordBreak: 'break-all' } }>{ numberCurrencyFormat(item.amount) }</Box></Table.Td>
                                        <Table.Td><Box maw={ 400 } sx={ { wordBreak: 'break-all' } }><Flex gap={ 10 } align={ 'center' }> <PaymentMethodIcon method={ item.method }/> { getTranslatedVariantForPaymentsMethod(item.method) }
                                        </Flex></Box></Table.Td>
                                        <Table.Td><Box maw={ 155} sx={ { wordBreak: 'break-all' } }>{ item.rrn }</Box></Table.Td>
                                        <Table.Td><Box maw={ 155 } sx={ { wordBreak: 'break-all' } }>{ item.stan }</Box></Table.Td>
                                        <Table.Td><Box maw={ 400 } sx={ { wordBreak: 'break-all' } }>{ item.transactionId }</Box></Table.Td>
                                    </Table.Tr>
                                );

                            }) }
                        </Table.Body>
                    </Table>

                </>
            }
        </>
    );

};

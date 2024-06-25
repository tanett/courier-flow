import React, { useEffect, useState } from 'react';
import { Trans } from '@lingui/macro';
import { Table } from 'shared/ui/table/ui/table-new/table';
import { Box, Checkbox, Divider, Flex, rem, UnstyledButton, useMantineTheme } from '@mantine/core';
import { typeSalesListTableHeader } from '../../types/types';


export const SalesListTableHeader: React.FC<typeSalesListTableHeader> = ({
    onCheckedAllHandler,
    indeterminate,
    allChecked,
    isAllowedExport,
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
                ? <Table.Th colSpan={ isAllowedExport ? 9 : 8 }>
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
                                        '&:hover': { backgroundColor: theme.fn.rgba(theme.colors.primary[5], 0.1) },
                                    } }
                                >
                                    { actions.label }
                                </UnstyledButton>
                                { index < headerActions.length - 1 && <Divider orientation={ 'vertical' } sx={ { borderColor: theme.colors.borderColor[0] } }/> }
                            </React.Fragment>

                        )) }
                    </Flex>
                </Table.Th>

                : <>
                    <Table.Th>
                        <Box sx={ { lineHeight: '16px' } }>
                            <Trans>Date & time </Trans>
                        </Box>

                    </Table.Th>
                    <Table.Th >
                        <Box sx={ { lineHeight: '16px', textAlign: 'left' } }>
                            <Trans>Receipt number</Trans>
                        </Box>
                    </Table.Th>
                    <Table.Th>
                        <Trans>Store</Trans>
                    </Table.Th>
                    <Table.Th>
                        <Box sx={ { lineHeight: '16px' } }>
                            <Trans>Employee</Trans>
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
                    <Table.Th>
                        <Trans>Refund</Trans>
                    </Table.Th>
                    { <Table.Th>
                        <Trans>Actions</Trans> {/* // todo fix it */ }
                    </Table.Th> }</> }
        </Table.Header>
    );

};

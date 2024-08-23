import React, { useState } from 'react';
import { Box, Button, Flex, Tooltip, useMantineTheme } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { NotFound } from 'shared/ui/not-found/not-found';
import { typeCashDeskDetailsOperationsProps } from '../../types/types';
import { TableDetailsCashDeskOperations } from './table';
import { useCashDeskOperationList } from '../../../../entities/cash-desk-operations/hooks/use-cash-desk-operation-list';
import { Pagination } from '../../../../shared/ui/pagination/table-pagination';
import { t, Trans } from '@lingui/macro';
import { IconPlus } from '@tabler/icons-react';
import { AddCorrectionDialog } from '../add-correction-dialog/add-correction-dialog';

export const CashDeskDetailsOperations: React.FC<typeCashDeskDetailsOperationsProps> = ({ cashDeskId, storeId }) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const isAllowCorrections = true; // TODO: fix it

    const {
        cashDeskOperationsList,
        pagination,
        isLoading,
        error,
    } = useCashDeskOperationList(cashDeskId);


    const [ addCorrectionPopup, setCorrectionPopup ] = useState<boolean>(false);
    const onCloseCorrectionPopup = () => setCorrectionPopup(false);

    return (
        error
            ? <Flex sx={ {
                height: '70vh',
                alignItems: 'center',
            } }><NotFound/></Flex>
            : <Box sx={ {
                borderTop: `1px solid ${ theme.colors.borderColor[ 0 ] }`,
                borderTopRightRadius: '8px',
                marginTop: '-1px',
                backgroundColor: theme.white,

            } }>

                <Flex justify={ 'space-between' } p={ 16 }
                    sx={ {
                        borderLeft: `1px solid ${ theme.colors.borderColor[ 0 ] }`,
                        borderRight: `1px solid ${ theme.colors.borderColor[ 0 ] }`,
                        borderTopRightRadius: '8px',
                    } }
                >
                    { (cashDeskOperationsList && pagination && pagination.totalElements > 0) ? <Box sx={ {
                        borderBottom: `2px solid ${ theme.colors.gray[ 5 ] }`,
                        alignSelf: 'center',
                    } }>{ i18n._(t`Number of operations`) }: { pagination?.totalElements || 0 }</Box> : <div/> }

                    { isAllowCorrections && <Tooltip withArrow arrowSize={ 6 } openDelay={ 1500 } radius="md" label={ i18n._(t`Add amount`) }>
                        <Button
                            variant="outline"
                            key="add-correction"
                            sx={ {
                                fontWeight: 700,
                                fontSize: theme.fontSizes.md,
                                letterSpacing: '0.3px',
                                '&:hover': { backgroundColor: theme.colors.primary[ 0 ] },
                            } }
                            onClick={ () => setCorrectionPopup(true)}
                            leftIcon={ <IconPlus size={ 20 }/> }
                        >
                            <Trans>Create correction</Trans>
                        </Button>
                    </Tooltip>
                    }
                </Flex>

                <TableDetailsCashDeskOperations
                    operationList={ cashDeskOperationsList }
                    isLoading={ isLoading }
                />

                { pagination && <Box py={ 10 } px ={16}><Pagination pagination={ pagination } withPerPage={ true }/></Box> }

                { addCorrectionPopup && <AddCorrectionDialog
                    cashDeskId={cashDeskId}
                    storeId={cashDeskId}
                    onCloseDialog={onCloseCorrectionPopup}
                /> }
            </Box>);

};

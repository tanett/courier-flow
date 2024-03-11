import React from 'react';
import { useStyles } from './styles';
import { Box, Flex, Pagination, Select } from '@mantine/core';
import { typeTablePagination } from '../../types/type';
import { perPageVariantList, queryParamsNames } from '../../../../../app/config/api-constants';
import { Trans } from '@lingui/macro';
import { useUrlParams } from '../../../../hooks/use-url-params/use-url-params';

export const TablePagination: React.FC<typeTablePagination> = ({ withPerPage, pageNumber, totalPages, totalElements, pageSize }) => {

    const { classes } = useStyles();

    const searchParams = useUrlParams();

    const setItemsPerPage = (itemsPerPage: string) => {

        searchParams.setSearchParams({
            [ queryParamsNames.itemsPerPage ]: itemsPerPage,
            [ queryParamsNames.pageNumber ]: undefined,
        });

    };

    const setPageNumber = (pageNumber: number) => {

        searchParams.setSearchParams({ [ queryParamsNames.pageNumber ]: pageNumber.toString() });

    };

    return (
        <Box className={classes.paginationBlock}>

            {withPerPage && <Flex className={classes.perPageContainer}>
                <Box>
                    <Trans>Items par page</Trans>
                </Box>
                <Select size="xs" radius="xs" data={perPageVariantList} value={pageSize.toString()} onChange={setItemsPerPage}/>
                <Box><Trans>of</Trans> {totalElements}</Box>
            </Flex>}

            <Flex className={classes.paginationContainer}>
                {totalPages > 1 && <Pagination radius="xs" value={pageNumber + 1} total={totalPages} onChange={setPageNumber}/>}
            </Flex>
        </Box>
    );

};

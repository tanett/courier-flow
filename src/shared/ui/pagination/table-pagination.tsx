import React from 'react';
import { useStyles } from './styles';
import { Box, Flex, Pagination as MantinePagination, Select } from '@mantine/core';
import { perPageVariantList, queryParamsNames } from '../../../app/config/api-constants';
import { Trans } from '@lingui/macro';
import { useUrlParams } from '../../hooks/use-url-params/use-url-params';
import { typeTablePaginationProps } from './types';
import { IconChevronDown } from '@tabler/icons-react';

export const Pagination: React.FC<typeTablePaginationProps> = ({
    withPerPage = true,
    pagination,
}) => {

    if (!pagination) return null;

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
        <Flex>
            <Box className={ classes.paginationBlock }>

                { withPerPage && pagination.pageSize && pagination.totalElements && <Flex className={ classes.perPageContainer }>
                    <Box>
                        <Trans>Records per page</Trans>
                    </Box>
                    <Select
                        size="xs" radius="xs"
                        data={ perPageVariantList }
                        value={ pagination.pageSize.toString() }
                        onChange={ setItemsPerPage }
                        rightSection={ <IconChevronDown size="1rem"/> }
                        styles={ {
                            rightSection: {
                                pointerEvents: 'none',
                                pointer: 'pointer',
                                right: '5px',
                                marginLeft: '5px',
                            },
                        } }
                        sx={ {
                            '&.mantine-Select-root div[aria-expanded=true] .mantine-Select-rightSection': { transform: 'rotate(180deg)' },
                            '&.mantine-Select-root  input': { paddingRight: '20px' , paddingLeft: '15px' ,paddingTop: '4px', paddingBottom: '4px', height: '33px' },

                        } }
                    />
                    <Box><Trans>from</Trans> { pagination.totalElements }</Box>
                </Flex> }

                <Flex className={ classes.paginationContainer }>
                    { pagination.totalPages > 1 && <MantinePagination radius="xs" value={ pagination.pageNumber + 1 } total={ pagination.totalPages } onChange={ setPageNumber }/> }
                </Flex>
            </Box>
        </Flex>
    );

};

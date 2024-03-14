import React from 'react';
import { Box, Flex, useMantineTheme } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t } from '@lingui/macro';
import { useLocation, useNavigate } from 'react-router-dom';
import { pathSections } from 'app/config/router-paths';
import { useGetStoresMerchantList } from 'features/merchant-details-stores/hooks/use-get-stores-merchant-list';
import { TableDetailsStores } from 'features/merchant-details-stores/ui/table/table-merchants-stores';
import { TablePagination } from 'shared/ui/table/ui/table-pagination/table-pagination';

export const MerchantDetailsStores: React.FC = () => {

    const { i18n } = useLingui();

    const navigate = useNavigate();

    const theme = useMantineTheme();

    const location = useLocation();


    const { storeList, pagination, isLoading, setRefetch } = useGetStoresMerchantList();

    const onAddClick = () => {

        navigate([ location.pathname, pathSections.create ].join('/'));

    };

    return (
        <Box sx={{
            borderTop: `1px solid ${theme.colors.borderColor[ 0 ]}`,
            borderTopRightRadius: '8px',
            marginTop: '-1px',
            backgroundColor: theme.white,

        }}>
            {/* <FilterPanel */}
            {/*     withFind={{ placeholder: i18n._(t`Type part of your username, email or phone number`) }} */}
            {/*     filterComponent={<TerminalsListFilter/>} */}
            {/* /> */}

            <Flex justify={'space-between'} p={16}
                sx={{
                    borderLeft: `1px solid ${theme.colors.borderColor[ 0 ]}`,
                    borderRight: `1px solid ${theme.colors.borderColor[ 0 ]}`,
                    borderTopRightRadius: '8px',
                }}
            >
                {(storeList && pagination && pagination.totalElements > 0) ? <Box sx={ {
                    borderBottom: `2px solid ${ theme.colors.gray[ 5 ] }`,
                    alignSelf: 'center',
                } }>{ i18n._(t`total`) }: { pagination?.totalElements || 0 }</Box> : <div/>}


            </Flex>

            <TableDetailsStores storeList={storeList} isLoading={isLoading} setRefetchList={setRefetch} />

            { pagination && <Flex py={ 16 }><TablePagination withPerPage={ pagination.totalPages > 1 } { ...pagination } /></Flex> }

        </Box>);

};

import React from 'react';
import { Box, Flex, SimpleGrid, Skeleton, useMantineTheme, Text, rem, Space } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { InfoCardSmall } from 'shared/ui/info-card-small';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { formatIncompletePhoneNumber } from 'libphonenumber-js';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { Table } from 'shared/ui/table';
import { useGetUserFromUrlWithStoresData } from 'features/users-details/hooks/use-get-user-from-url-with-stores-data';
import { Pagination } from 'shared/ui/pagination/table-pagination';
import { routerPaths } from 'app/config/router-paths';
import { useNavigate } from 'react-router-dom';


export const UsersDetails: React.FC = () => {

    const theme = useMantineTheme();

    const { i18n } = useLingui();

    const {
        userData,
        isUserFetching,
        storesList,
        isStoresFetching,
        pagination,
    } = useGetUserFromUrlWithStoresData();

    const navigate = useNavigate();

    return (
        <>
            <SimpleGrid
                sx={ {
                    border: `1px solid ${ theme.colors.borderColor[ 0 ] }`,
                    borderRadius: '8px',
                    padding: '10px 16px',
                    backgroundColor: theme.white,
                } }
                breakpoints={ [
                    {
                        minWidth: 'md',
                        cols: 1,
                        spacing: 10,
                    },
                    {
                        minWidth: 1200,
                        cols: 2,
                        spacing: 30,
                    }
                ] }>
                <InfoCardSmall label={ i18n._(t`Role`) } content={ `${ userData?.role.name }` || '-' } withBottomBorder={ false }/>
                <SimpleGrid
                    breakpoints={ [
                        {
                            minWidth: 'md',
                            cols: 2,
                            spacing: 10,
                        },
                        {
                            minWidth: 1200,
                            cols: 2,
                            spacing: 30,
                        }
                    ] }>
                    <InfoCardSmall label={ i18n._(t`Phone number`) }
                        iconLabel={ <PhoneIcon/> }
                        content={ userData?.phone ? formatIncompletePhoneNumber(userData.phone) : '-' }
                        withBottomBorder={ false }/>
                    <InfoCardSmall label={ i18n._(t`Email`) }
                        iconLabel={ <EnvelopeIcon/> }
                        content={ userData?.email || '-' } withBottomBorder={ false }/>

                </SimpleGrid>
            </SimpleGrid>
            <Box
                sx={ {
                    borderRadius: '8px',
                    padding: '0',
                    backgroundColor: theme.white,
                } }
            >
                <Text
                    sx={ {
                        borderTop: `1px solid ${ theme.colors.borderColor[ 0 ] }`,
                        borderLeft: `1px solid ${ theme.colors.borderColor[ 0 ] }`,
                        borderRight: `1px solid ${ theme.colors.borderColor[ 0 ] }`,
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px',
                        padding: `16px 16px 12px 16px`,
                        color: theme.colors.primary[ 5 ],
                        fontSize: theme.fontSizes.md,
                        fontWeight: 500,
                        lineHeight: rem(27),
                        letterSpacing: rem(0.3),
                    } }
                >{ i18n._(t`Stores`) }</Text>
                { isStoresFetching
                    ? <Flex direction={ 'column' }>
                        <Flex gap={ 10 } wrap={ 'nowrap' }>
                            <Skeleton height={ 30 } radius="xs"/>
                            <Skeleton height={ 30 } radius="xs"/>
                            <Skeleton height={ 30 } radius="xs"/>
                        </Flex>
                        <Flex gap={ 10 } wrap={ 'nowrap' }>
                            <Skeleton height={ 30 } radius="xs"/>
                            <Skeleton height={ 30 } radius="xs"/>
                            <Skeleton height={ 30 } radius="xs"/>
                        </Flex>
                        <Flex gap={ 10 } wrap={ 'nowrap' }>
                            <Skeleton height={ 30 } radius="xs"/>
                            <Skeleton height={ 30 } radius="xs"/>
                            <Skeleton height={ 30 } radius="xs"/>
                        </Flex>
                    </Flex>
                    : <Table variant={ 'inTab' }>
                        <Table.Header>
                            <Table.Th withoutLeftDivider>
                                <Trans>Name</Trans>
                            </Table.Th>
                            <Table.Th>
                                <Trans>Address</Trans>
                            </Table.Th>
                            <Table.Th>
                                <Trans>Phone number</Trans>
                            </Table.Th>
                        </Table.Header>

                        <Table.Body>
                            { storesList && storesList.length > 0 && storesList.map(item => {

                                return (
                                    <Table.Tr key={ item.id } >
                                        <Table.Td><Flex maw={ 400 } wrap={ 'wrap' } sx={ { wordBreak: 'break-all', color: theme.colors.primary[ 5 ], cursor: 'pointer' } }
                                            onClick={() => {

                                                navigate([ routerPaths.stores, item.id, item.name ].join('/'));

                                            }}>{ item.name }</Flex></Table.Td>
                                        <Table.Td><Flex maw={ 400 } wrap={ 'wrap' } sx={ { wordBreak: 'break-all' } }>{ item.address }</Flex></Table.Td>
                                        <Table.Td>{ item.phoneNumber ? formatIncompletePhoneNumber(item.phoneNumber) : '-' }</Table.Td>

                                    </Table.Tr>
                                );

                            }) }
                            { userData && userData.storeIds.length === 0 && <Table.EmptyRow columnCount={ 3 }>
                                <Trans>This user is not associated with any store</Trans>
                            </Table.EmptyRow> }
                        </Table.Body>
                    </Table> }

            </Box>
            <Space h={20}/>
            {pagination && <Pagination pagination={ pagination } withPerPage={ false }/> }
            { isUserFetching && <LoaderOverlay/> }
        </>
    );

};

import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, Space, useMantineTheme } from '@mantine/core';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { InfoCardSmall } from 'shared/ui/info-card-small';
import { BuildingStorefrontIcon, ChatBubbleBottomCenterIcon, EnvelopeIcon, MapPinIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline';
import { formatIncompletePhoneNumber } from 'libphonenumber-js';
import { typeOrder } from '../../../../../entities/orders/model/state-slice';
import DateTimeInLine from 'shared/ui/date-time-in-line/date-time-in-line';
import BadgeOrdersStatus from 'shared/ui/badge-orders-status/badge-orders-status';
import ButtonAsLink from 'shared/ui/button-as-link/button-as-link';
import { generatePath, useNavigate } from 'react-router-dom';
import { routerPaths } from 'app/config/router-paths';
import { useGetStoreByIdQuery } from '../../../../../entities/stores/api/api';
import { useSearchUserQuery } from '../../../../../entities/users/api/api';
import { typeUser } from '../../../../../entities/user-profile/model/state-slice';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import { useIsAllowedPermissions } from '../../../../../entities/users/hooks/use-is-allowed-permissions';
import { editOrdersPermissions, readStoresPermissions, readUserPermissions } from 'app/config/permissions-config';


export const OrdersDetailsCommon: React.FC<{ data: typeOrder }> = ({ data, }) => {

    const theme = useMantineTheme();

    const { i18n } = useLingui();

    const navigate = useNavigate();

    const {
        data: storeData,
        isFetching: isStoreFetching
    } = useGetStoreByIdQuery(data.storeId);

    const usersIds = [ data.createdBy ];
    if (data?.collectorId) usersIds.push(data.collectorId);
    if (data?.courierId) usersIds.push(data.courierId);

    const {
        data: users,
        isFetching: isUsersFetching
    } = useSearchUserQuery({
        filter: { ids: usersIds },
        pagination: {
            pageNumber: 0,
            pageSize: 10
        }
    });

    const [ userCollector, setUserCollector ] = useState<typeUser | undefined>();
    const [ userCourier, setUserCourier ] = useState<typeUser | undefined>();

    const isAllowedReadUsers = useIsAllowedPermissions(readUserPermissions);
    const isAllowedReadStores = useIsAllowedPermissions(readStoresPermissions);


    useEffect(() => {
        if (users) {
            if (data.collectorId) {
                const findIndex = users.content.findIndex(item => item.id === data.collectorId);
                if (findIndex >= 0) {setUserCollector(users.content[findIndex]);}
            }
            if (data.courierId) {
                const findIndex = users.content.findIndex(item => item.id === data.courierId);
                if (findIndex >= 0) {setUserCourier(users.content[findIndex]);}
            }
        }
    }, [ users ]);

    const totalCostWithoutDiscountAndServicePayment = data.products.reduce((prev, cur) => prev + cur.quantity * cur.priceInStore, 0);

    return (
        <>
            <SimpleGrid
                sx={ {
                    border: `1px solid ${ theme.colors.borderColor[0] }`,
                    borderTopRightRadius: '8px',
                    borderBottomRightRadius: '8px',
                    borderBottomLeftRadius: '8px',
                    padding: '10px 16px',
                    marginTop: '-1px',
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
                        spacing: 60,
                    }
                ] }>
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
                            spacing: 60,
                        }
                    ] }>

                    <InfoCardSmall label={ i18n._(t`Date & time`) }
                                   alignSelfStretch={ true }
                                   content={ data ? <DateTimeInLine date={ data.orderedAt } fontSizeTime={ '14px' } colorTimeGray={ false }/> : '-' }/>
                    <InfoCardSmall label={ i18n._(t`Status`) }
                                   alignSelfStretch={ true }
                                   content={ data?.status ? <BadgeOrdersStatus statusCode={ data.status } key={ data.id + data.status }/> : '-' }/>
                </SimpleGrid>


                <InfoCardSmall label={ i18n._(t`Store`) } iconLabel={ <BuildingStorefrontIcon/> }
                               content={ (storeData && <ButtonAsLink disabled={!isAllowedReadStores || true} onClick={ () => navigate(generatePath(routerPaths.stores_details, {
                                   id: storeData.id,
                                   storeName: storeData.name
                               })) } label={ storeData.name }/>) || '-' }
                />
                <InfoCardSmall label={ i18n._(t`Order created by`) }
                               content={ (users && <ButtonAsLink disabled={!isAllowedReadUsers} onClick={ () => navigate(generatePath(routerPaths.users_details, {
                                   id: users.content[0].id,
                                   userName: users.content[0].fullName
                               })) } label={ users.content[0].fullName }/>) || '-' }
                               withBottomBorder={ false }
                />
                {/* <SimpleGrid */ }
                {/*     breakpoints={ [ */ }
                {/*         { */ }
                {/*             minWidth: 'md', */ }
                {/*             cols: 2, */ }
                {/*             spacing: 10, */ }
                {/*         }, */ }
                {/*         { */ }
                {/*             minWidth: 1200, */ }
                {/*             cols: 2, */ }
                {/*             spacing: 60, */ }
                {/*         } */ }
                {/*     ] }> */ }
                {/*     <InfoCardSmall label={ i18n._(t`Order created by`) } */ }
                {/*                    content={ (users && <ButtonAsLink onClick={ () => navigate(generatePath(routerPaths.users_details, { */ }
                {/*                        id: users.content[0].id, */ }
                {/*                        userName:users.content[0].fullName */ }
                {/*                    })) } label={ users.content[0].fullName}/>) || '-' } */ }
                {/*                    withBottomBorder={false} */ }
                {/*     /> */ }
                {/*     /!* <InfoCardSmall label={ i18n._(t`Assignee`) } *!/ */ }
                {/*     /!*                content={ (userCollector && <ButtonAsLink onClick={ () => navigate(generatePath(routerPaths.users_details, { *!/ */ }
                {/*     /!*                    id: userCollector.id, *!/ */ }
                {/*     /!*                    userName:userCollector.fullName *!/ */ }
                {/*     /!*                })) } label={ userCollector.fullName}/>) || '-' } *!/ */ }
                {/*     /!*                withBottomBorder={false} *!/ */ }
                {/*     /!* /> *!/ */ }


                {/* </SimpleGrid> */ }
                <InfoCardSmall label={ i18n._(t`Courier`) }
                               content={ (userCourier && <ButtonAsLink onClick={ () => navigate(generatePath(routerPaths.users_details, {
                                   id: userCourier.id,
                                   userName: userCourier.fullName
                               })) } label={ userCourier.fullName }/>) || '-' }
                               withBottomBorder={ false }
                />

            </SimpleGrid>
            <Space h={ 16 }/>
            <SimpleGrid
                sx={ {
                    border: `1px solid ${ theme.colors.borderColor[0] }`,
                    borderRadius: '8px',
                    padding: '10px 16px',
                    backgroundColor: theme.white,
                } }
                breakpoints={ [
                    {
                        minWidth: 'md',
                        cols: 2,
                        spacing: 10,
                    },
                    {
                        minWidth: 1200,
                        cols: 4,
                        spacing: 60,
                    }
                ] }>
                <InfoCardSmall label={ i18n._(t`Service payment`) }
                               content={ (data.servicePaymentAmount && data.servicePaymentAmount>0 )? numberCurrencyFormat(data.servicePaymentAmount)+ ` (${numberCurrencyFormat(data.servicePaymentPercent?data.servicePaymentPercent*100 :  data.servicePaymentAmount/totalCostWithoutDiscountAndServicePayment*100)} %)` : '0' }/>
                <InfoCardSmall label={ i18n._(t`Discount amount`) }
                               alignSelfStretch={ true }
                               content={ data ? numberCurrencyFormat(data.totalDiscountAmount) : '-' }/>
                <InfoCardSmall label={ i18n._(t`Discount %`) }
                               alignSelfStretch={ true }
                               content={ data ? numberCurrencyFormat(data.totalDiscountAmount * 100 / totalCostWithoutDiscountAndServicePayment) + '%' : '-' }/>
                <div/>

                <InfoCardSmall label={ i18n._(t`Total cost without discount`) }
                               alignSelfStretch={ true }
                               content={ data ? numberCurrencyFormat(totalCostWithoutDiscountAndServicePayment) : '-' }
                               withBottomBorder={ false }
                /> {/* // total cost - totalDiscountAmount    */ }

                <InfoCardSmall label={ i18n._(t`Total cost`) }
                               content={ data ? numberCurrencyFormat(data.totalCost) : '-' } withBottomBorder={ false }/>

            </SimpleGrid>
            <Space h={ 16 }/>
            <Box
                sx={ {
                    border: `1px solid ${ theme.colors.borderColor[0] }`,
                    borderRadius: '8px',
                    padding: '10px 16px',
                    backgroundColor: theme.white,
                } }
            >
                <SimpleGrid
                    breakpoints={ [
                        {
                            minWidth: 'md',
                            cols: 2,
                            spacing: 10,
                        },
                        {
                            minWidth: 1200,
                            cols: 4,
                            spacing: 60,
                        }
                    ] }>
                    <InfoCardSmall label={ i18n._(t`Client`) }
                                   iconLabel={ <UserIcon/> }
                                   content={ data ? data.customer.fullName : '-' }/>
                    <InfoCardSmall label={ i18n._(t`E-mail`) }
                                   iconLabel={ <EnvelopeIcon/> }
                                   alignSelfStretch={ true }
                                   content={ data ? data.customer.email : '-' }/>
                    <InfoCardSmall label={ i18n._(t`Phone number`) }
                                   iconLabel={ <PhoneIcon/> }
                                   content={ data?.customer?.phone ? formatIncompletePhoneNumber(data.customer.phone) : '-' }/>
                    <div/>

                </SimpleGrid>
                <SimpleGrid
                    breakpoints={ [
                        {
                            minWidth: 'md',
                            cols: 1,
                            spacing: 10,
                        },
                        {
                            minWidth: 1200,
                            cols: 2,
                            spacing: 60,
                        }
                    ] }>
                    <InfoCardSmall label={ i18n._(t`Delivery address`) }
                                   content={ data?.deliveryAddress?.address || '-' }
                                   iconLabel={ <MapPinIcon/> }
                                   withBottomBorder={ false }/>
                    <InfoCardSmall label={ i18n._(t`Comment`) }
                                   content={ data?.deliveryAddress?.additionalInfo || '-' }
                                   iconLabel={ <ChatBubbleBottomCenterIcon/> }
                                   withBottomBorder={ false }/>
                </SimpleGrid>
            </Box>
        </>
    );

};

import React from 'react';
import { Box, Flex, useMantineTheme } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { useAppDispatchT } from 'app/state';
import { useNavigate } from 'react-router-dom';
import { NotFound } from 'shared/ui/not-found/not-found';
import { typeCashDeskDetailsOperationsProps } from '../../types/types';
import { TableDetailsCashDeskOperations } from './table';
import { useCashDeskOperationList } from '../../../../entities/cash-desk-operations/hooks/use-cash-desk-operation-list';
import { Pagination } from '../../../../shared/ui/pagination/table-pagination';
import { t } from '@lingui/macro';

export const CashDeskDetailsOperations: React.FC<typeCashDeskDetailsOperationsProps> = ({ cashDeskId, isFetching }) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const dispatchAppT = useAppDispatchT();

    const navigate = useNavigate();

    const {
        cashDeskOperationsList,
        pagination,
        isLoading,
        refetch,
        error,
    } = useCashDeskOperationList(cashDeskId);

    /* const [ editUser, { isLoading: isLoadingEditUser } ] = usePatchUserMutation();


    const [ dialogToAddUser, setDialogToAddUser ] = useState<boolean>(false);

    const onAddClick = () => {

        setDialogToAddUser(true);

    };*/
    /* const onCloseDialogToAddUser = (refetch: boolean) => {

        if (refetch) {

            setRefetch(true);

        }

        setDialogToAddUser(false);

    };*/


    /* const [ dialogToRemoveUser, setDialogToRemoveUser ] = useState<null | typeUser>(null);

    const onCloseDialogToRemoveUser = () => {

        setDialogToRemoveUser(null);

    };

    const onOpenDialogRemoveUser = (id: string) => {

        if (operationsList?.length) {

            const user = operationsList.find(item => item.id === id);

            if (user) {

                setDialogToRemoveUser(user);

            }

        }

    };*/

    /* const onConfirmRemoveUser = async (user: typeUser) => {

        try {

            const dataObject: typeUsersEdit = {
                id: user.id,
                storeIds: {
                    patchType: 'REMOVE',
                    values: [ storeId ],
                },
            };

            await editUser(dataObject).unwrap();

            dispatchAppT(notificationActions.addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                message: i18n._(t`User was removed successfully.`),
            }));

            onCloseDialogToRemoveUser();
            setRefetch(true);


        } catch (err) {

            errorHandler(err as typeResponseError, 'onRemoveUserFromStore', dispatchAppT);

        }

    };*/

    // const goToEditUserPage = (id: string | number) => navigate(generatePath(routerPaths.stores_details_users_edit, { id: storeId, storeName: storeName, userId: id.toString() }));

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

                    {/* { isAllowEditUser && <Tooltip withArrow arrowSize={ 6 } openDelay={ 1500 } radius="md" label={ i18n._(t`Add an existing employee to store`) }><Button
                        variant={ 'outline' }
                        key={ 'add-user-in-store' }
                        sx={ {
                            fontWeight: 700,
                            fontSize: theme.fontSizes.md,
                            letterSpacing: '0.3px',
                            '&:hover': { backgroundColor: theme.colors.primary[ 0 ] },
                        } }
                        onClick={ onAddClick }
                        leftIcon={ <IconPlus size={ 20 }/> }><Trans>Add</Trans>
                    </Button></Tooltip> }*/}
                </Flex>

                <TableDetailsCashDeskOperations
                    operationList={ cashDeskOperationsList }
                    isLoading={ isLoading }
                />

                { pagination && <Box py={ 10 } px ={16}><Pagination pagination={ pagination } withPerPage={ true }/></Box> }

                {/* { dialogToAddUser && <Modal modalWidth="auto" opened={ true } onCloseByOverlay={ () => onCloseDialogToAddUser(false) }>
                    <Modal.Body>
                        <>
                            <Modal.Header title={ i18n._(t`Add an employee`) } onClose={ () => onCloseDialogToAddUser(false) }/>
                            <UserAddToStore storeId={ storeId } onClose={ () => onCloseDialogToAddUser(true) }/>
                        </>
                    </Modal.Body>
                </Modal> }*/}
            </Box>);

};

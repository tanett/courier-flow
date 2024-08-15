import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Modal } from '../../../shared/ui/modal';
import { CashDeskTable } from './cash-desk-table';
import { routerPaths } from '../../../app/config/router-paths';
import { useCashDeskList } from '../../../entities/cash-desk/hooks/use-cash-desk-list';
import { Dialog } from '../../../shared/ui/dialog-new';
import { LoaderOverlay } from '../../../shared/ui/loader-overlay';
import { useCashDeskToArchiveMutation } from '../../../entities/cash-desk/api/api';
import { notificationActions } from '../../../entities/notification/model';
import { NOTIFICATION_TYPES } from '../../../shared/ui/page-notification';
import { errorHandler } from '../../../app/utils/errorHandler';
import { typeResponseError } from '../../../app/api/types';
import { useAppDispatchT } from '../../../app/state';

export const CashDeskList: React.FC = () => {

    const { i18n } = useLingui();

    const navigate = useNavigate();

    const dispatchAppT = useAppDispatchT();

    const [ modalArchiveItemData, setModalArchiveItemData ] = useState<{id: string | number, name: string} | null>(null);

    const {
        cashDeskList,
        pagination,
        isLoading,
        refetch,
    } = useCashDeskList();

    const [ cashDeskToArchive, { isLoading: isArchiveLoading } ] = useCashDeskToArchiveMutation();

    const goToDetailsCashDeskPage = (id: string | number, cashDeskName: string) => navigate([ routerPaths.cash_desks, id.toString(), cashDeskName ].join('/'));

    const onEdit = (id: string | number) => navigate([ routerPaths.cash_desks, id.toString(), 'edit' ].join('/'));

    const onArchive = (id: string | number, name: string) => {

        setModalArchiveItemData({ id, name });

    };

    const onCloseArchivePopup = () => setModalArchiveItemData(null);

    const onConfirmDelete = async () => {

        if (modalArchiveItemData?.id) {

            try {

                await cashDeskToArchive([ modalArchiveItemData.id.toString() ]).unwrap();

                dispatchAppT(notificationActions.addNotification({
                    type: NOTIFICATION_TYPES.SUCCESS,
                    message: t`Cash desk archived successfully.`,
                }));

                onCloseArchivePopup();
                refetch();

            } catch (err) {

                errorHandler(err as typeResponseError, 'onArchiveCashDesk', dispatchAppT);

            }

        }

    };


    return (<>
        <CashDeskTable
            cashDeskList={cashDeskList}
            pagination={pagination}
            isLoading={isLoading}
            goToDetailsCashDeskPage={goToDetailsCashDeskPage}
            onEdit={onEdit}
            onArchive={onArchive}
        />


        { modalArchiveItemData && <Modal modalWidth="dialog" opened={ true }>
            <Modal.Body>
                <Dialog
                    cancelButton={ {
                        title: i18n._(t`Cancel`),
                        handler: onCloseArchivePopup,
                    } }
                    confirmButton={ {
                        title: i18n._(`action-archive`),
                        handler: () => onConfirmDelete(),
                    } }
                >
                    <Trans>Are you sure you want to archive <br/>the cash desk</Trans>  &quot;{ modalArchiveItemData.name }&quot;?
                </Dialog>
                { isArchiveLoading && <LoaderOverlay/> }
            </Modal.Body>
        </Modal> }

    </>);

};

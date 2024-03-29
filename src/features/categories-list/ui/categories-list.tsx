import React, { useState } from 'react';
import { useCategoriesList } from 'features/categories-list/hooks/use-categories-list';
import { useNavigate } from 'react-router-dom';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { routerPaths } from '../../../app/config/router-paths';
import { Modal } from '../../../shared/ui/modal';
import { Dialog } from '../../../shared/ui/dialog-new';
import { useSelectorT } from '../../../app/state';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { editCategoryPermissions } from 'app/config/permissions-config';
import { typeCategory } from '../../../entities/category/model/types';
import { useDeleteCategory } from '../../../entities/category/hooks/use-delete-category';
import { CategoriesListTable } from 'features/categories-list/ui/categories-table';

export const CategoriesList: React.FC = () => {

    const { i18n } = useLingui();

    const navigate = useNavigate();

    const [ confirmToArchiveData, setConfirmToArchiveData ] = useState<null | typeCategory>(null);

    const currentUser = useSelectorT(state => state.userProfile.userProfile);

    const isAllowedEdit = useIsAllowedPermissions(editCategoryPermissions);

    const onCloseConfirmToArchive = () => {

        setConfirmToArchiveData(null);

    };

    const onConfirmArchive = (id: string) => {

        if (categoriesList?.length) {

            const category = categoriesList.find(item => item.id === id);

            if (category) {

                setConfirmToArchiveData(category);

            }

        }

    };

    const {
        categoriesList,
        pagination,
        isLoading,
        setRefetch,
    } = useCategoriesList();


    const goToEditPage = (id: string | number) => navigate([ routerPaths.products_categories, id.toString(), 'edit' ].join('/'));

    const { onDelete } = useDeleteCategory({
        onSuccess: () => {

            onCloseConfirmToArchive();
            setRefetch(true);

        },
        onError: () => onCloseConfirmToArchive(),
    });


    return (<>
        <CategoriesListTable
            currentUser={ currentUser }
            isAllowedCategoryEdit={ isAllowedEdit }
            goToEditCategoryPage={ goToEditPage }
            onConfirmArchiveCategory={ onConfirmArchive }
            categoriesList={ categoriesList }
            pagination={ pagination }
            isLoading={ isLoading }
        />


        { confirmToArchiveData && <Modal modalWidth="dialog" opened={ true }>
            <Modal.Body>
                <Dialog
                    cancelButton={ {
                        title: i18n._(t`Cancel`),
                        handler: onCloseConfirmToArchive,
                    } }
                    confirmButton={ {
                        title: i18n._(t`Confirm`),
                        handler: () => onDelete(confirmToArchiveData?.id),
                    } }
                >
                    <Trans>Are you sure you want to archive<br/>the category</Trans> &quot;{ confirmToArchiveData.name }&quot;?
                </Dialog>
            </Modal.Body>
        </Modal> }

    </>);

};

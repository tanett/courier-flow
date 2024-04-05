import React, { useEffect, useState } from 'react';
import { useCategoriesList } from 'features/categories-list/hooks/use-categories-list';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from '../../../app/config/router-paths';
import { useSelectorT } from '../../../app/state';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { editCategoryPermissions } from 'app/config/permissions-config';
import { typeCategoryExtended } from '../../../entities/category/model/types';
import { useDeleteCategory } from '../../../entities/category/hooks/use-delete-category';
import { CategoriesListTable } from 'features/categories-list/ui/table/categories-table';
import { ArchiveItemModal } from 'features/categories-list/ui/modals/archive-item-modal';
import { typeCategoryWithCheckBox, typeHeadersAction } from 'features/categories-list/types/types';
import { ArchiveSelectedItemModal } from 'features/categories-list/ui/modals/archive-selected-item-modal';
import { useListState } from '@mantine/hooks';
import { Trans } from '@lingui/macro';
import { getProductCountFromSelectedCategories } from 'features/categories-list/helpers/getProductCountFromSelectedCategories';

export const CategoriesList: React.FC = () => {

    const navigate = useNavigate();

    const currentUser = useSelectorT(state => state.userProfile.userProfile);

    const isAllowedEdit = useIsAllowedPermissions(editCategoryPermissions);

    const {
        categoriesList,
        pagination,
        isLoading,
        setRefetch,
    } = useCategoriesList();


    // product list with checked
    const [ values, handlers ] = useListState<typeCategoryWithCheckBox>(undefined);

    useEffect(() => {

        if (categoriesList) {

            handlers.setState(categoriesList.map(item => ({
                ...item,
                checked: false,
            })));

        }

    }, [ categoriesList ]);

    // modals
    const [ modalArchiveItemData, setModalArchiveItemData ] = useState<null | typeCategoryExtended>(null);
    const [ isOpenModalSelectedItemArchive, setIsOpenSelectedItemArchive ] = useState(false);


    const onCloseModalToArchiveItem = () => {

        setModalArchiveItemData(null);

    };

    const onClickRowActionsArchiveItem = (category: typeCategoryWithCheckBox) => {

        setModalArchiveItemData(category);

    };


    const goToEditPage = (id: string | number) => navigate([ routerPaths.products_categories, id.toString(), 'edit' ].join('/'));

    const { onDelete } = useDeleteCategory({
        onSuccess: () => {

            if (modalArchiveItemData) onCloseModalToArchiveItem();
            if (isOpenModalSelectedItemArchive) setIsOpenSelectedItemArchive(false);

            setRefetch(true);

        },
        onError: () => {

            if (modalArchiveItemData) onCloseModalToArchiveItem();
            if (isOpenModalSelectedItemArchive) setIsOpenSelectedItemArchive(false);

        },
    });

    const headerActions: typeHeadersAction[] = [
        {
            id: 'selected-archive-btn',
            label: <Trans id={ 'action-archive' }>Archive</Trans>,
            handler: (event) => setIsOpenSelectedItemArchive(true),
        }
    ];


    return (<>
        <CategoriesListTable
            currentUser={ currentUser }
            isAllowedCategoryEdit={ isAllowedEdit }
            goToEditCategoryPage={ goToEditPage }
            onClickRowActionsArchiveItem={ onClickRowActionsArchiveItem }
            categoriesList={ values }
            handlersListState={ handlers }
            pagination={ pagination }
            isLoading={ isLoading }
            headerActions={ headerActions }
        />


        { modalArchiveItemData
            && <ArchiveItemModal
                onClose={ onCloseModalToArchiveItem }
                onConfirm={ () => onDelete([ modalArchiveItemData.id ]) }
                itemName={ modalArchiveItemData.name }
                productsCount={ modalArchiveItemData.productsCount }
            />
        }

        { isOpenModalSelectedItemArchive
            && <ArchiveSelectedItemModal
                onClose={ () => setIsOpenSelectedItemArchive(false) }
                onConfirm={ () => onDelete(values.filter(item => item.checked).map(item => item.id)) }
                productsCount={ getProductCountFromSelectedCategories(values) }
            />
        }

    </>);

};

import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { initialForm, typeChangeCategoryForm } from './form';
import { Box, Button, Flex, rem, Space, useMantineTheme } from '@mantine/core';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useAppDispatchT } from 'app/state';
import { typeResponseError } from 'app/api/types';
import { errorHandler } from 'app/utils/errorHandler';
import { notificationActions } from '../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { typeReturnForm } from 'features/selector-with-search-store/types';
import { SelectorWithSearchProductCategory } from 'features/selector-with-search-product-category';
import { useBatchPatchProductMutation } from '../../entities/products/api/api';
import { typeProductExtendedWithCheckBox } from 'features/products-list/types/types';
import { typeChangeCategoryForSelectedProductsRequest } from '../../entities/products/api/types';


export const ProductsChangeCategory: React.FC<{ onClose: (refetch: boolean) => void, list: typeProductExtendedWithCheckBox[] }> = ({
    onClose,
    list
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const form = useForm<typeChangeCategoryForm>(initialForm);

    const dispatchAppT = useAppDispatchT();

    const [ batchPatchProduct, { isLoading } ] = useBatchPatchProductMutation();

    const onCancelClick = () => {

        form.reset();
        onClose(false);

    };

    const [ isInProgress, setIsInProgress ] = useState(false);

    const onSubmit = async () => {

        if (form.values.categoryId) {

            setIsInProgress(true);

            const selectedMap: typeChangeCategoryForSelectedProductsRequest = list.filter(item => item.checked)
                .map(product => ({
                    id: product.id,
                    productCategoryId: form.values.categoryId
                }));

            if (selectedMap.length > 0) {
                try {

                    await batchPatchProduct(selectedMap).unwrap();

                    dispatchAppT(notificationActions.addNotification({
                        type: NOTIFICATION_TYPES.SUCCESS,
                        message: i18n._(t`Category changed successfully.`),
                    }));

                    onClose(true);

                } catch (err) {

                    errorHandler(err as typeResponseError, 'onChangeProductCategorySelectedProducts', dispatchAppT);


                }
            }
            setIsInProgress(false);

        }


    };

    return (
        <form onSubmit={ form.onSubmit(onSubmit) }>
            <Box
                sx={ {
                    minWidth: '50vw',
                    padding: rem(15),
                    marginTop: rem(-10),
                    position: 'relative',
                    overflow: 'visible',
                    '& .mantine-InputWrapper-root': { maxWidth: 'none' }
                } }>

                <SelectorWithSearchProductCategory
                    required={ true }
                    fieldName={ 'categoryId' }
                    form={ form as unknown as typeReturnForm }
                    initialValue={ null }
                />

                <Space h={ 32 }/>
                <Flex sx={ {
                    gap: rem(24),
                    justifyContent: 'center',
                    '& .mantine-Button-root': {
                        minWidth: rem(165),
                        fontSize: theme.fontSizes.md,
                        fontWeight: 700,
                    },
                } }>
                    <Button key="cancel" type="reset" variant="outline" onClick={ onCancelClick }>{ t`Cancel` }</Button>
                    <Button key="submit" disabled={ !!Object.values(form.errors).length || isInProgress }
                            type="submit">{ t`Change` }</Button>
                </Flex>
            </Box>
            { isLoading && <LoaderOverlay/> }
        </form>
    );

};

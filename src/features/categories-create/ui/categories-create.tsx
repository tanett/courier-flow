import React, { useState } from 'react';
import { useStyles } from './styles';
import { useForm } from '@mantine/form';
import { typeCategoriesCreateForm } from '../types/types';
import { initialCategoryCreateForm } from '../form/form';
import { useAppDispatchT, useSelectorT } from 'app/state';
import { Button, Flex, Loader, Select, SimpleGrid, Space, TextInput } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { errorHandler } from 'app/utils/errorHandler';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { notificationActions } from '../../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { typeResponseError } from 'app/api/types';
import { FieldsetForForm } from 'shared/ui/fieldset-for-form';
import { useNavigate } from 'react-router-dom';
import { typeProductCategoryCreate } from '../../../entities/productsCategory/model/types';
import { useCreateProductCategoryMutation } from '../../../entities/productsCategory/api/api';


export const CategoriesCreate: React.FC = () => {

    const { classes } = useStyles();

    const navigate = useNavigate();

    const { i18n } = useLingui();

    const dispatchAppT = useAppDispatchT();

    const form = useForm<typeCategoriesCreateForm>(initialCategoryCreateForm);

    const [ createCategory, { isLoading } ] = useCreateProductCategoryMutation();

    const [ isInProgress, setIsInProgress ] = useState(false);

    const currentUser = useSelectorT(state => state.userProfile.userProfile);


    const onSave = async () => {

        if (currentUser) {

            setIsInProgress(true);


            const dataObject: typeProductCategoryCreate = {
                name: form.values.name.trim(),
                merchantId: currentUser.actor.merchantId,
            };

            try {

                await createCategory(dataObject).unwrap();

                dispatchAppT(notificationActions.addNotification({
                    type: NOTIFICATION_TYPES.SUCCESS,
                    message: i18n._(t`Category created successfully.`),
                }));

                navigate(-1);

            } catch (err) {

                errorHandler(err as typeResponseError, 'onCreateCategory', dispatchAppT);
                setIsInProgress(false);

            }


            setIsInProgress(false);

        }

    };

    const onCancel = () => {

        form.reset();
        navigate(-1);

    };

    return (
        <form onSubmit={ form.onSubmit(onSave) }>

            <Flex className={ classes.flexColumn }>

                <FieldsetForForm title={ <Trans>General information</Trans> }>

                    <TextInput
                        withAsterisk
                        label={ <Trans id={ 'item-name' }>Name</Trans> }
                        { ...form.getInputProps('name') }
                        maxLength={ 250 }
                    />

                </FieldsetForForm>

                <Space h={ 10 }/>
                <Flex className={ classes.buttonsBar }>
                    <Button key="cancel" type="reset" variant="outline" onClick={ onCancel }>{ t`Cancel` }</Button>
                    <Button key="submit" disabled={ !!Object.values(form.errors).length || isInProgress }
                            type="submit">{ t`Save` }</Button>
                </Flex>

            </Flex>
            { (isInProgress || isLoading) && <LoaderOverlay/> }
        </form>
    );

};

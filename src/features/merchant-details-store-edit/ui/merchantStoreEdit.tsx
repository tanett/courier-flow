import React, { useEffect, useState } from 'react';
import { useStyles } from './styles';
import { useForm } from '@mantine/form';
import { useAppDispatchT } from 'app/state';
import { Button, Flex, Select, SimpleGrid, Space, Textarea, TextInput } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { errorHandler } from 'app/utils/errorHandler';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { notificationActions } from 'entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { typeResponseError } from 'app/api/types';
import { FieldsetForForm } from 'shared/ui/fieldset-for-form';
import { useNavigate } from 'react-router-dom';
import { PhoneInputWithCountrySelector } from 'shared/ui/phoneInput/ui/phoneInputWithCountrySelector';
import { useGetStoreByIdQuery, usePatchStoreMutation } from 'entities/stores/api/api';
import { typeStoreEdit } from 'entities/stores/model/types';
import { storeTypeList } from 'entities/stores/constants/store-type-list';
import { convertPhoneNumberToStringForApi } from 'shared/utils/convertPhoneNumbertoString';
import { FormSkeleton } from 'features/merchant-details-store-edit/form-skeleton/formSkeleton';
import { IconChevronDown } from '@tabler/icons-react';


export const MerchantStoreEdit: React.FC<{ merchantId: string, storeId: string }> = ({
    merchantId,
    storeId,
}) => {

    const { classes } = useStyles();

    const navigate = useNavigate();

    const { i18n } = useLingui();

    const dispatchAppT = useAppDispatchT();

    const form = useForm();

    // <typeMerchantStoreCreateForm>(initialMerchantStoreCreateForm);

    const {
        data: storeData,
        isFetching,
    } = useGetStoreByIdQuery(storeId);

    useEffect(() => {

        if (storeData) {

            form.setFieldValue('name', storeData.name);
            form.setFieldValue('phoneNumber', storeData.phoneNumber ? storeData.phoneNumber : '');
            form.setFieldValue('email', storeData.email ? storeData.email : '');
            form.setFieldValue('address', storeData.address);
            form.setFieldValue('locality', storeData.locality);
            form.setFieldValue('description', storeData.description ? storeData.description : '');
            form.setFieldValue('type', storeData.type);

        }

    }, [ storeData ]);

    const [ patchStore, { isLoading } ] = usePatchStoreMutation();

    const [ isInProgress, setIsInProgress ] = useState(false);

    const onSave = async () => {

        if (storeData) {

            setIsInProgress(true);

            const { phoneNumber } = form.values;

            // const phone = convertPhoneNumberToStringForApi(phoneNumber.trim()) !== ''
            //     ? storeData?.phoneNumber
            //         ? convertPhoneNumberToStringForApi(phoneNumber.trim()) !== storeData.phoneNumber
            //             ? convertPhoneNumberToStringForApi(phoneNumber)
            //             : undefined
            //         : convertPhoneNumberToStringForApi(phoneNumber)
            //     : storeData.phoneNumber ? null : undefined;
            //
            // const dataObject: typeStoreEdit = {
            //     id: storeId,
            //     name: form.values.name.trim() === storeData.name ? undefined : form.values.name.trim(),
            //     email: form.values.email.trim() !== ''
            //         ? form.values.email.trim() !== storeData.email
            //             ? form.values.email.trim()
            //             : undefined
            //         : storeData.email ? null : undefined,
            //     phoneNumber: phone,
            //     merchantId: merchantId,
            //     address: form.values.address.trim(),
            //     locality: form.values.locality.trim(),
            //     description: form.values.description.trim() !== ''
            //         ? form.values.description.trim() !== storeData.description
            //             ? form.values.description.trim()
            //             : undefined
            //         : storeData.description ? null : undefined,
            //     type: form.values.type,
            // };
            //    console.log(dataObject);
            try {

                //  await patchStore(dataObject).unwrap();

                dispatchAppT(notificationActions.addNotification({
                    type: NOTIFICATION_TYPES.SUCCESS,
                    message: i18n._(t`The store edited successfully.`),
                }));

                navigate(-1);

            } catch (err) {

                errorHandler(err as typeResponseError, 'onEditStore', dispatchAppT);
                setIsInProgress(false);

            }

            setIsInProgress(false);

        }


    };

    const onCancel = () => {

        form.reset();
        navigate(-1);

    };

    return ((isFetching || !storeData) ? <FormSkeleton/>
        : <form onSubmit={ form.onSubmit(onSave) }>

            <Flex className={ classes.flexColumn }>

                {/* <FieldsetForForm title={ <Trans>General Information</Trans> }>*/}

                {/*    <TextInput*/}
                {/*        withAsterisk*/}
                {/*        label={ <Trans>Name</Trans> }*/}
                {/*        placeholder={ i18n._(t`Name`) }*/}
                {/*        { ...form.getInputProps('name') }*/}
                {/*        maxLength={ 150 }*/}
                {/*    />*/}
                {/*    <SimpleGrid cols={ 2 } className={ classes.formGrid }>*/}
                {/*        <Select*/}
                {/*            withAsterisk*/}
                {/*            label={ <Trans>Type</Trans> }*/}
                {/*            data={ storeTypeList }*/}
                {/*            { ...form.getInputProps('type') }*/}
                {/*            rightSection={ <IconChevronDown size="1rem"/> }*/}
                {/*            sx={{ '&.mantine-Select-root div[aria-expanded=true] .mantine-Select-rightSection': { transform: 'rotate(180deg)' } }}*/}
                {/*        />*/}
                {/*    </SimpleGrid>*/}
                {/* </FieldsetForForm>*/}
                {/* <FieldsetForForm title={ <Trans>Contacts</Trans> }>*/}

                {/*    <SimpleGrid cols={ 2 } className={ classes.formGrid }>*/}
                {/*        <PhoneInputWithCountrySelector*/}
                {/*            isRequired={ false }*/}
                {/*            { ...form.getInputProps('phoneNumber') }*/}
                {/*            value={ form.values.phoneNumber }*/}
                {/*            onChange={ (value: string) => form.setFieldValue('phoneNumber', value) }*/}
                {/*        />*/}
                {/*        <TextInput*/}
                {/*            label={ <Trans>Email</Trans> }*/}
                {/*            placeholder="example@email.com"*/}
                {/*            { ...form.getInputProps('email') }*/}
                {/*            maxLength={ 100 }*/}
                {/*        />*/}

                {/*    </SimpleGrid>*/}
                {/*    <TextInput*/}
                {/*        withAsterisk*/}
                {/*        label={ <Trans>Address</Trans> }*/}
                {/*        { ...form.getInputProps('address') }*/}
                {/*        maxLength={ 250 }*/}
                {/*    />*/}
                {/*    <TextInput*/}
                {/*        withAsterisk*/}
                {/*        label={ <Trans>locality</Trans> }*/}
                {/*        placeholder={ i18n._(t`name of the locality`) }*/}
                {/*        { ...form.getInputProps('locality') }*/}
                {/*        maxLength={ 150 }*/}
                {/*    />*/}
                {/* </FieldsetForForm>*/}
                {/* <FieldsetForForm title={ <Trans>Other</Trans> }>*/}

                {/*    <Textarea*/}
                {/*        label={ <Trans>Description</Trans> }*/}
                {/*        placeholder={ i18n._(t`additional information`) }*/}
                {/*        { ...form.getInputProps('description') }*/}
                {/*        maxLength={ 500 }*/}
                {/*    />*/}
                {/* </FieldsetForForm>*/}
                {/* <Space h={ 10 }/>*/}
                {/* <Flex className={ classes.buttonsBar }>*/}
                {/*    <Button key="cancel" type="reset" variant="outline" onClick={ onCancel }>{ t`Cancel` }</Button>*/}
                {/*    <Button key="submit" disabled={ !!Object.values(form.errors).length || isInProgress }*/}
                {/*        type="submit">{ t`Save` }</Button>*/}
                {/* </Flex>*/}

            </Flex>
            { (isInProgress || isLoading) && <LoaderOverlay/> }
        </form>

    );

};

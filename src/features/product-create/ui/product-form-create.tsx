import React, { useState } from 'react';
import { useStyles } from './styles';
import { useForm } from '@mantine/form';
import { typeProductForm } from '../types/types';
import { useAppDispatchT } from 'app/state';
import { Alert, Box, Button, Flex, Input, Loader, Select, SimpleGrid, Space, Text, TextInput, useMantineTheme, NavLink } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { FieldsetForForm } from 'shared/ui/fieldset-for-form';
import { generatePath, useNavigate } from 'react-router-dom';
import { IconAlertCircle, IconChevronDown } from '@tabler/icons-react';
import { useCreateProductMutation } from '../../../entities/products/api/api';
import { createInitialFormHelper } from '../../../entities/products/helpers/createInitialForm';
import { PRODUCT_ADDITIONAL_FIELD, typeProductAdditionalFieldInfo, typeProductCreate } from '../../../entities/products/model/state-slice';
import { productUnitValueListForSelector } from '../../../entities/products/constants/product-unit-value-list-for-selector';
import { SelectorWithSearchProductCategory } from 'features/selector-with-search-product-category';
import { typeReturnForm } from 'features/selector-with-search-store/types';
import { notificationActions } from '../../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';
import { CheckBoxForForm } from 'shared/ui/check-box-for-form/check-box-for-form';
import { CreateInputForAdditionalField } from '../../../entities/products/helpers/createInputForAdditionalField';
import { IMaskInput } from 'react-imask';
import { typeGetCurrentUserResponse } from '../../../entities/user-profile/api/types';
import { BarcodesInputForProductForm } from 'features/barcodes-input-for-product-form/barcodes-input-for-product-form';
import { routerPaths } from 'app/config/router-paths';


export const ProductFormCreate: React.FC<{
    additionalFields: typeProductAdditionalFieldInfo[],
    currentUser: typeGetCurrentUserResponse
}> = ({
    additionalFields,
    currentUser,
}) => {

    const { classes } = useStyles();

    const navigate = useNavigate();

    const theme = useMantineTheme();

    const { i18n } = useLingui();

    const dispatchAppT = useAppDispatchT();

    const initialValue = createInitialFormHelper(additionalFields!);

    const form = useForm<typeProductForm>(initialValue);

    const [ createProduct, { isLoading } ] = useCreateProductMutation();

    const [ isInProgress, setIsInProgress ] = useState(false);


    const onSave = async () => {

        if (form.values.unit) {

            setIsInProgress(true);

            const dataObject: typeProductCreate = {
                barcodes: form.values.barcodes,
                marked: form.values.marked,
                unit: form.values.unit,
                vat: +((parseFloat(form.values.vat) / 100).toFixed(4)),
                name: form.values.name.trim(),
                merchantId: currentUser.actor.merchantId,
                productAdditionalFields: Object.values(form.values.productAdditionalFields).filter(item => item.value !== ''),
                productCategoryId: form.values.productCategoryId,
            };

            try {

               const resp =  await createProduct(dataObject).unwrap();

                dispatchAppT(notificationActions.addNotification({
                    type: NOTIFICATION_TYPES.SUCCESS,
                    message: i18n._(t`Product created successfully.`),
                }));

                navigate(generatePath(routerPaths.products_details,{id: resp.id}));

            } catch (err) {

                errorHandler(err as typeResponseError, 'onCreateProduct', dispatchAppT);
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
                        label={ <Trans>Product name</Trans> }
                        sx={ {
                            '&.mantine-InputWrapper-root': {
                                maxWidth: '100%',
                                width: '100%',
                            },
                        } }
                        { ...form.getInputProps('name') }
                        maxLength={ 150 }
                    />
                    <SimpleGrid cols={ 2 } className={ classes.formGrid }>
                        <CreateInputForAdditionalField
                            path={ `productAdditionalFields.${ PRODUCT_ADDITIONAL_FIELD.PSID }.value` }
                            form={ form }
                            additionalFields={ additionalFields }
                            code={ PRODUCT_ADDITIONAL_FIELD.PSID }
                            additionalLabel={ <Text size={ 12 } color={ theme.colors.gray[5] } sx={ { letterSpacing: 0.3 } }>
                                <Trans>Check the psid on </Trans>&nbsp;
                                <NavLink
                                    component={ 'a' }
                                    href={ 'https://tasnif.soliq.uz' }
                                    target="_blank"
                                    label={ 'tasnif.soliq.uz' }

                                    sx={ {
                                        display: 'inline',
                                        textDecoration: 'none',
                                        color: theme.colors.primary[5],
                                        cursor: 'pointer',
                                        marginLeft: 5,
                                        marginRight: 0,
                                        padding: 0,
                                        fontSize: '14px',
                                        '&:hover': { textDecoration: 'underline' },
                                    } }/>
                            </Text> }
                        />
                        <CreateInputForAdditionalField
                            path={ `productAdditionalFields.${ PRODUCT_ADDITIONAL_FIELD.PACKAGE_CODE }.value` }
                            form={ form }
                            additionalFields={ additionalFields }
                            code={ PRODUCT_ADDITIONAL_FIELD.PACKAGE_CODE }
                        />
                        <CreateInputForAdditionalField
                            path={ `productAdditionalFields.${ PRODUCT_ADDITIONAL_FIELD.COMMISSION_TIN }.value` }
                            form={ form }
                            additionalFields={ additionalFields }
                            code={ PRODUCT_ADDITIONAL_FIELD.COMMISSION_TIN }
                        />
                        <CreateInputForAdditionalField
                            path={ `productAdditionalFields.${ PRODUCT_ADDITIONAL_FIELD.COMMISSION_PINFL }.value` }
                            form={ form }
                            additionalFields={ additionalFields }
                            code={ PRODUCT_ADDITIONAL_FIELD.COMMISSION_PINFL }
                        />
                        <Select
                            withAsterisk
                            label={ <Trans>Unit</Trans> }
                            data={ productUnitValueListForSelector }
                            transitionProps={ {
                                duration: 80,
                                timingFunction: 'ease',
                            } }
                            { ...form.getInputProps('unit') }
                            rightSection={ isLoading ? <Loader size={ 16 }/> : <IconChevronDown size="1rem"/> }
                            sx={ { '&.mantine-Select-root div[aria-expanded=true] .mantine-Select-rightSection': { transform: 'rotate(180deg)' } } }
                        />
                        <CreateInputForAdditionalField
                            path={ `productAdditionalFields.${ PRODUCT_ADDITIONAL_FIELD.UNIT_CODE }.value` }
                            form={ form }
                            additionalFields={ additionalFields }
                            code={ PRODUCT_ADDITIONAL_FIELD.UNIT_CODE }
                        />
                    </SimpleGrid>
                    <SimpleGrid cols={ 2 } className={ classes.formGrid }>
                        <Box>
                            <SelectorWithSearchProductCategory
                                form={ form as unknown as typeReturnForm }
                                fieldName={ 'productCategoryId' }
                                required={ false }
                                initialValue={ null }
                            />
                            <Input.Wrapper
                                id={ 'vat-input-wrapper' }
                                label={ <Trans>Vat in %</Trans> }
                                required
                                mt={ 16 }>
                                <Input<any>
                                    component={ IMaskInput }
                                    mask={ Number }
                                    scale={ 2 } // digits after point, 0 for integers
                                    padFractionalZeros={ false } // if true, then pads zeros at end to the length of scale
                                    normalizeZeros={ true } // appends or removes zeros at ends
                                    radix={ '.' } // fractional delimiter
                                    mapToRadix={ [ ',' ] } // symbols to process as radix
                                    placeholder={ '0.00-100%' }
                                    // additional number interval options (e.g.)
                                    min={ 0 }
                                    max={ 100 }
                                    autofix={ true }
                                    id={ 'vat-input' }

                                    // lazy={false}
                                    // unmask={true}
                                    // overwrite={true}
                                    { ...form.getInputProps('vat') }

                                />
                            </Input.Wrapper>

                        </Box>
                        <Box>
                            <CheckBoxForForm
                                generallabel={ i18n._(t`Marked product`) }
                                size={ 'md' }
                                label={ form.values.marked ? <Trans>Marked</Trans> : <Trans>Not marked</Trans> }
                                { ...form.getInputProps('marked') }
                            />

                            { (form.values.barcodes.length === 0 && form.values.marked) &&
                                <Alert icon={ <IconAlertCircle size="1rem"/> } title={ i18n._(t`Check for the barcode!`) } color={ theme.colors.primary[5] } mb={ -32 }>
                                    <Text><Trans>A barcode is required for labeled goods.</Trans></Text>
                                    <Text><Trans>Labeled items must be sold individually ??</Trans></Text>
                                </Alert>
                            }
                        </Box>

                    </SimpleGrid>

                    <BarcodesInputForProductForm form={ form }/>

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

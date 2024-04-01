import React, { useState } from 'react';
import { useStyles } from './styles';
import { useForm } from '@mantine/form';
import { typeProductForm } from '../types/types';
import { useAppDispatchT, useSelectorT } from 'app/state';
import { ActionIcon, Alert, Box, Button, Flex, Input, Loader, NumberInput, Select, SimpleGrid, Space, Text, TextInput, UnstyledButton, useMantineTheme } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { FieldsetForForm } from 'shared/ui/fieldset-for-form';
import { useNavigate } from 'react-router-dom';
import { IconAlertCircle, IconChevronDown, IconX } from '@tabler/icons-react';
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
import { CreateInputForAdditionalField } from 'entities/products/helpers/createInputForAdditionalField';


export const ProductCreate: React.FC = () => {

    const { classes } = useStyles();

    const navigate = useNavigate();

    const theme = useMantineTheme();

    const { i18n } = useLingui();

    const dispatchAppT = useAppDispatchT();

    const additionalFields = useSelectorT(state => state.products.additionalFieldInfo);

    const initialValue = createInitialFormHelper(additionalFields!); // todo fix it

    const form = useForm<typeProductForm>(initialValue);

    const [ createProduct, { isLoading } ] = useCreateProductMutation();

    const [ isInProgress, setIsInProgress ] = useState(false);

    const currentUser = useSelectorT(state => state.userProfile.userProfile);


    const onSave = async () => {

        if (currentUser && form.values.unit) {

            setIsInProgress(true);

            const dataObject: typeProductCreate = {
                barcodes: form.values.barcodes,
                marked: form.values.marked,
                unit: form.values.unit,
                vat: form.values.vat,
                name: form.values.name.trim(),
                merchantId: currentUser.actor.merchantId,
                productAdditionalFields: Object.values(form.values.productAdditionalFields).filter(item => item.value !== ''),
                productCategoryId: form.values.productCategoryId
            };

            try {

                await createProduct(dataObject).unwrap();

                dispatchAppT(notificationActions.addNotification({
                    type: NOTIFICATION_TYPES.SUCCESS,
                    message: i18n._(t`User created successfully.`),
                }));

                navigate(-1);

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
        additionalFields ?
            <form onSubmit={ form.onSubmit(onSave) }>

                <Flex className={ classes.flexColumn }>

                    <FieldsetForForm title={ <Trans>General information</Trans> }>
                        <TextInput
                            withAsterisk
                            label={ <Trans>Product name</Trans> }
                            // placeholder={ i18n._(t`product name`) }
                            sx={ {
                                '&.mantine-InputWrapper-root': {
                                    maxWidth: '100%',
                                    width: '100%'
                                }
                            } }
                            { ...form.getInputProps('name') }
                            maxLength={ 150 }
                        />
                        <SimpleGrid cols={ 2 } className={ classes.formGrid }>
                            <CreateInputForAdditionalField
                                path={`productAdditionalFields.${ PRODUCT_ADDITIONAL_FIELD.PSID }.value`}
                                form={form}
                                additionalFields={additionalFields}
                                code={PRODUCT_ADDITIONAL_FIELD.PSID}
                            />
                            <div/>
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
                                path={`productAdditionalFields.${ PRODUCT_ADDITIONAL_FIELD.UNIT_CODE }.value`}
                                form={form}
                                additionalFields={additionalFields}
                                code={PRODUCT_ADDITIONAL_FIELD.UNIT_CODE}
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
                                <NumberInput
                                    withAsterisk
                                    hideControls
                                    label={ <Trans>Vat</Trans> }
                                   // pattern={'/^\\d{1,2}(.\\d{1,2})?$/gm'}
                                    // placeholder={ i18n._(t`product name`) }
                                    { ...form.getInputProps('vat') }
                                    min={ 0 }
                                    parser={ (value) => value.replace(/\s?|(,*)/g, '') }  // todo make the limiting for inputs
                                    formatter={ (value) =>
                                        !Number.isNaN(parseFloat(value))
                                            ? `${ value }`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                                            : ''
                                    }
                                    mt={ 16 }
                                />
                            </Box>
                            <Box>
                                <CheckBoxForForm
                                    generallabel={ i18n._(t`Marked product`) }
                                    size={ 'md' }
                                    label={ form.values.marked ? <Trans>marked</Trans> : <Trans>not marked</Trans> }
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

                        <Input.Wrapper
                            id="input-barcodes"
                            label={ <Trans>Barcodes</Trans> }
                            // error={form.validateField('barcodes')}
                            sx={ {
                                '&.mantine-InputWrapper-root': {
                                    maxWidth: '100%',
                                    width: '100%'
                                }
                            } }
                        >
                            <Flex wrap={ 'nowrap' } gap={ 10 }>
                                <Flex wrap={ 'wrap' } gap={ 10 } sx={ { flexGrow: 1 } }>
                                    { form.values.barcodes.map((item, index) => {
                                        return <div key={ index }>
                                            <Flex wrap={ 'nowrap' } gap={ 6 }>
                                                <Text>item</Text>
                                                <ActionIcon variant={ 'subtle' }
                                                            onClick={ () => form.setFieldValue('barcodes', form.values.barcodes.filter(code => item !== code)) }
                                                ><IconX size={ 16 }/> </ActionIcon>
                                            </Flex>
                                        </div>;
                                    }) }
                                    <Input id="input-demo" placeholder="Your email"
                                           sx={ {
                                               width: '100%',
                                               '&.mantine-Input-wrapper input': { border: 'none' },
                                           } }/>
                                </Flex>
                                <UnstyledButton>Add barcode</UnstyledButton>
                            </Flex>


                        </Input.Wrapper>
                    </FieldsetForForm>
                    <FieldsetForForm title={ <Trans>Other</Trans> }>
                        <SimpleGrid cols={ 2 } className={ classes.formGrid }>
                            <CreateInputForAdditionalField
                                path={`productAdditionalFields.${ PRODUCT_ADDITIONAL_FIELD.PACKAGE_CODE }.value`}
                                form={form}
                                additionalFields={additionalFields}
                                code={PRODUCT_ADDITIONAL_FIELD.PACKAGE_CODE}
                            />
                            <div/>
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


                        </SimpleGrid>
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
            : <LoaderOverlay/>
    );

};

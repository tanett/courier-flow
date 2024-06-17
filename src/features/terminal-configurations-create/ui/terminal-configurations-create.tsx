import React, { useState } from 'react';
import { useStyles } from './styles';
import { useForm } from '@mantine/form';
import { CONFIGURATION_TYPE_TABS, typeTerminalConfigurationsCreateForm } from '../types/types';
import { initialTerminalConfigurationsCreateForm } from '../form/form';
import { useAppDispatchT, useSelectorT } from 'app/state';
import { Button, Flex, Space, Tabs, TextInput } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { errorHandler } from 'app/utils/errorHandler';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { notificationActions } from '../../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { typeResponseError } from 'app/api/types';
import { useNavigate } from 'react-router-dom';
import { useCreateTerminalConfigurationMutation } from '../../../entities/terminals-configurations/api/api';
import SelectStoresTerminals from 'features/terminal-configurations-create/ui/select-stores&terminals/select-stores-terminals';
import SelectCategoriesForTerminals from 'features/terminal-configurations-create/ui/select-categories-for-terminal/select-categories-for-terminals';
import SelectModules from 'features/terminal-configurations-create/ui/select-modules/select-modules';
import { typeCreateTerminalConfigurations } from 'entities/terminals-configurations/model/state-slice';


export const TerminalConfigurationsCreate: React.FC = () => {

    const { classes } = useStyles();

    const navigate = useNavigate();

    const { i18n } = useLingui();

    const dispatchAppT = useAppDispatchT();

    const form = useForm<typeTerminalConfigurationsCreateForm>(initialTerminalConfigurationsCreateForm);

    const [ createTerminalConfigurations, { isLoading } ] = useCreateTerminalConfigurationMutation();

    const [ isInProgress, setIsInProgress ] = useState(false);

    const currentUser = useSelectorT(state => state.userProfile.userProfile);

    const onSave = async () => {

        if (currentUser) {

            setIsInProgress(true);


            const dataObject: typeCreateTerminalConfigurations = {
                name: form.values.name.trim(),
                merchantId: currentUser.actor.merchantId,
                storeIds: form.values.storeIds,
                terminalIds: form.values.terminalIds,
                productCategoryIds: form.values.productCategory.map(item=>item.id),
                availableModules: form.values.availableModules,

            };

            try {

                await createTerminalConfigurations(dataObject).unwrap();

                dispatchAppT(notificationActions.addNotification({
                    type: NOTIFICATION_TYPES.SUCCESS,
                    message: i18n._(t`Terminal configuration created successfully.`),
                }));

                navigate(-1);

            } catch (err) {

                errorHandler(err as typeResponseError, 'onCreateTerminalConfigurations', dispatchAppT);
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
                <TextInput
                    withAsterisk
                    label={ <Trans>Configuration name</Trans> }
                    { ...form.getInputProps('name') }
                    maxLength={ 250 }
                    sx={ {
                        '&.mantine-InputWrapper-root': {
                            maxWidth: '100%',
                            width: '100%',
                        },
                    } }


                />
                <Tabs
                    defaultValue={ CONFIGURATION_TYPE_TABS.STORES }
                    className={ classes.tab }
                    variant="outline"
                >
                    <Tabs.List>
                        <Tabs.Tab value={ CONFIGURATION_TYPE_TABS.STORES }>{ i18n._(t`Stores & Terminal SN`) }</Tabs.Tab>
                        <Tabs.Tab value={ CONFIGURATION_TYPE_TABS.CATEGORIES }>{ i18n._(t`Categories`) }</Tabs.Tab>
                        <Tabs.Tab value={ CONFIGURATION_TYPE_TABS.MODULES }>{ i18n._(t`Modules`) }</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value={ CONFIGURATION_TYPE_TABS.STORES }>
                        <SelectStoresTerminals form={ form } />
                    </Tabs.Panel>
                    <Tabs.Panel value={ CONFIGURATION_TYPE_TABS.CATEGORIES }>
                        <SelectCategoriesForTerminals form={ form } /></Tabs.Panel>
                    <Tabs.Panel value={ CONFIGURATION_TYPE_TABS.MODULES }><SelectModules form={ form } /></Tabs.Panel>
                </Tabs>

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

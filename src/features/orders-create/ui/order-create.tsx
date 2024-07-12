import React, { useEffect, useState } from 'react';
import { useAppDispatchT, useSelectorT } from 'app/state';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { OrderClient } from 'features/orders-create/ui/order-client';
import { Button, Flex, Space, Tabs, useMantineTheme } from '@mantine/core';
import { t } from '@lingui/macro';
import { useStyles } from './styles';
import { useCreateOrderMutation } from '../../../entities/orders/api/api';
import { useForm } from '@mantine/form';
import { fieldsInTabClient, fieldsInTabProduct, initialOrderForm } from 'features/orders-create/form/form';
import { typeOrdersForm } from 'features/orders-create/types/types';
import { useNavigate } from 'react-router-dom';
import { useLingui } from '@lingui/react';
import { OrderProducts } from 'features/orders-create/ui/order-products';

const enum TYPE_TABS {
    CLIENT = 'client',
    PRODUCTS = 'products'
}

export const OrderCreate: React.FC = () => {

    const currentUser = useSelectorT(state => state.userProfile.userProfile);

    const { classes } = useStyles();

    const navigate = useNavigate();

    const theme = useMantineTheme();

    const { i18n } = useLingui();

    const dispatchAppT = useAppDispatchT();

    const form = useForm<typeOrdersForm>(initialOrderForm);

    const [ tab, setTab ] = useState(TYPE_TABS.CLIENT);

    const [ errorInTab, setErrorInTab ] = useState<TYPE_TABS | null>(null);

    const [ createOrder, { isLoading } ] = useCreateOrderMutation();

    const [ isInProgress, setIsInProgress ] = useState(false);


    useEffect(() => {

        const fieldWithErrors = Object.keys(form.errors);

        if (fieldWithErrors.length > 0) {

            const errorInClient = fieldsInTabClient.some((fieldName) => fieldWithErrors.includes(fieldName));
            const errorInProducts = fieldsInTabProduct.some((fieldName) => fieldWithErrors.includes(fieldName));
            if (errorInClient && tab !== TYPE_TABS.CLIENT) { setErrorInTab(TYPE_TABS.CLIENT);}
            if (errorInProducts && tab !== TYPE_TABS.PRODUCTS) { setErrorInTab(TYPE_TABS.PRODUCTS);}

        }
    }, [ form.errors, tab ]);

    const onCancel = () => {

        form.reset();
        navigate(-1);

    };

    const onSave = () => {console.log('click');};

    return (
        (currentUser) ?
            <form onSubmit={ form.onSubmit(onSave) }>
                <Tabs
                    defaultValue={ TYPE_TABS.CLIENT }
                    className={ classes.tab }
                    variant="outline"
                    value={ tab }
                    onTabChange={ (value) => { setTab(value as TYPE_TABS); } }
                >
                    <Flex justify="space-between" align={ 'end' }>
                        <Tabs.List className={ classes.tab }>
                            <Tabs.Tab value={ TYPE_TABS.CLIENT } className={errorInTab === TYPE_TABS.CLIENT ? classes.errorInTab : undefined}>{ i18n._(t`Client details`) }</Tabs.Tab>
                            <Tabs.Tab value={ TYPE_TABS.PRODUCTS } className={errorInTab === TYPE_TABS.PRODUCTS ? classes.errorInTab : undefined}>{ i18n._(t`Products`) }</Tabs.Tab>
                        </Tabs.List>
                    </Flex>

                    <Tabs.Panel value={ TYPE_TABS.CLIENT }><OrderClient form={ form }/> </Tabs.Panel>
                    <Tabs.Panel value={ TYPE_TABS.PRODUCTS }><OrderProducts form={ form } /></Tabs.Panel>
                </Tabs>
                { (isInProgress || isLoading) && <LoaderOverlay/> }
                <Space h={ 42 }/>
                <Flex className={ classes.buttonsBar }>
                    <Button key="cancel" type="reset" variant="outline" onClick={ onCancel }>{ t`Cancel` }</Button>
                    <Button key="submit" disabled={ !!Object.values(form.errors).length || isInProgress }
                            type="submit">{ t`Save` }</Button>
                </Flex>
            </form>
            : <LoaderOverlay/>
    );

};

import { typeFilterForm } from '../types/types';
import React, { useContext } from 'react';
import { devicesFilterForm, initialDevicesFilterForm } from '../forms/forms';
import { useForm } from '@mantine/form';
import { Flex, TextInput } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t } from '@lingui/macro';
import { FilterButtonsBar, FilterFormWrapper, DrawerContext } from '../../../shared/ui/filter-panel';
import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { useStyles } from './styles';
import { queryParamsNames } from '../../../app/config/api-constants';

export const DevicesListFilter: React.FC = () => {

    const { i18n } = useLingui();

    const { classes } = useStyles();

    const urlParams = useUrlParams();

    const close: undefined | (() => void) = useContext(DrawerContext);

    const defaultFormValues = { model: urlParams.getFilterValue('model') as string ?? initialDevicesFilterForm.model };

    const form = useForm<typeFilterForm>({
        ...devicesFilterForm,
        initialValues: defaultFormValues,
    });

    const setFilterHandler = () => {


        const filterObj: Record<string, unknown> = { model: form.values.model ? form.values.model.trim() : undefined };

        urlParams.setSearchParams({
            [ queryParamsNames.filtersString ]: urlParams.filtersToUri(filterObj),
            [ queryParamsNames.pageNumber ]: undefined,
        });

        if (close) close();

    };

    const onReset = () => {

        urlParams.setSearchParams({
            [ queryParamsNames.filtersString ]: urlParams.filtersToUri({}),
            [ queryParamsNames.pageNumber ]: undefined,
        });
        form.setValues((prev) => ({ ...prev, ...initialDevicesFilterForm }));

    };


    return (
        <FilterFormWrapper>
            <form onSubmit={ form.onSubmit(setFilterHandler) } onReset={ form.onReset }>
                <Flex className={ classes.fieldListContainer }>
                    <TextInput
                        label={ i18n._(t`Model`) }
                        { ...form.getInputProps('model') }
                    />
                </Flex>

                <FilterButtonsBar onReset={ onReset }/>
            </form>
        </FilterFormWrapper>
    );

};

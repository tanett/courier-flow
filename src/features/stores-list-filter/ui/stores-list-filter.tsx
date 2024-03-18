import { typeFilterForm } from '../types/types';
import React, { useContext, useEffect } from 'react';
import { storesFilterForm } from '../forms/forms';
import { useForm } from '@mantine/form';
import { Select } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t } from '@lingui/macro';
import { FilterButtonsBar, FilterFormWrapper, DrawerContext } from '../../../shared/ui/filter-panel';
import { queryParamsNames } from '../../../app/config/api-constants';
import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { DatePickerInput } from '@mantine/dates';
import { DatesProviderWithLocale } from '../../../shared/providers/dates-provider-with-locale/dates-provider-with-locale';
import { storeTypeList } from '../../../entities/stores/constants/store-type-list';
import { IconChevronDown } from '@tabler/icons-react';


export const StoresListFilter: React.FC = () => {

    const { i18n } = useLingui();

    const close: undefined | (() => void) = useContext(DrawerContext);

    const form = useForm<typeFilterForm>(storesFilterForm);

    const urlParams = useUrlParams();

    useEffect(() => {

        const type = urlParams.getFilterValue('type');
        const createdAtFrom = urlParams.getFilterValue('createdAtFrom');
        const createdAtTo = urlParams.getFilterValue('createdAtTo');

        if (type && typeof type === 'string') form.setValues({ type: type });
        if (createdAtTo && typeof createdAtTo === 'string' && createdAtFrom && typeof createdAtFrom === 'string') form.setValues({ createdAt: [ new Date(createdAtFrom), new Date(createdAtTo) ] });

    }, []);

    const setFilterHandler = () => {

        const filterObj: Record<string, unknown> = {
            type: form.values.type,
            createdAtFrom: form.values.createdAt[ 0 ] ? (form.values.createdAt[ 0 ]).toISOString() : null,
            createdAtTo: form.values.createdAt[ 1 ] ? (form.values.createdAt[ 1 ]).toISOString() : null,
        };

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
        form.reset();

    };

    return (
        <FilterFormWrapper>

            <form onSubmit={ form.onSubmit(setFilterHandler) } onReset={ form.onReset }>
                <Select
                    clearable
                    label={ i18n._(t`Store type`) }
                    data={ storeTypeList }
                    { ...form.getInputProps('type') }
                    rightSection={ <IconChevronDown size="1rem"/> }
                    sx={ { '&.mantine-Select-root div[aria-expanded=true] .mantine-Select-rightSection': { transform: 'rotate(180deg)' } } }
                />
                <DatesProviderWithLocale>
                    <DatePickerInput
                        type="range"
                        clearable
                        valueFormat="DD MMMM YYYY"
                        label={ i18n._(t`Creation date`) }
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        placeholder={ i18n._(t`Pick dates range`) }
                        { ...form.getInputProps('createdAt') }
                        minDate={ new Date('2020-01-01') }
                        maxDate={ new Date() }
                    />
                </DatesProviderWithLocale>

                <FilterButtonsBar onReset={ onReset }/>
            </form>

        </FilterFormWrapper>
    );

};

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
import { storeTypeList } from '../../../entities/stores/constants/store-type-list';
import { IconChevronDown } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { DateSelectorComponent } from 'shared/ui/date-selector-component/date-selector-component';
import { typeReturnForm } from 'features/selector-with-search-store/types';


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
            createdAtFrom: form.values.createdAt[0] ? (form.values.createdAt[0]).toISOString() : null,
            createdAtTo: form.values.createdAt[1] ? dayjs(form.values.createdAt[1]).set('h',23).set('m',59).set('s',59).set('ms',999).toISOString() : null,
        };

        urlParams.setSearchParams({
            [queryParamsNames.filtersString]: urlParams.filtersToUri(filterObj),
            [queryParamsNames.pageNumber]: undefined,
        });

        if (close) close();

    };

    const onReset = () => {

        urlParams.setSearchParams({
            [queryParamsNames.filtersString]: urlParams.filtersToUri({}),
            [queryParamsNames.pageNumber]: undefined,
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
                    styles={ {
                        rightSection: {
                            pointerEvents: 'none',
                            pointer: 'pointer',
                        },
                    } }
                    sx={ { '&.mantine-Select-root div[aria-expanded=true] .mantine-Select-rightSection': { transform: 'rotate(180deg)' } } }
                />
                <DateSelectorComponent
                    label={ i18n._(t`Creation date`) }
                    fieldName={ 'createdAt' }
                    form={ form as unknown as typeReturnForm }
                   />


                <FilterButtonsBar onReset={ onReset }/>
            </form>

        </FilterFormWrapper>
    );

};

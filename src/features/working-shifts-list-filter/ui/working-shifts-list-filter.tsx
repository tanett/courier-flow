import { typeWorkingShiftsFilterForm } from '../types/types';
import React, { useContext, useEffect } from 'react';
import { workingShiftsFilterForm } from '../forms/forms';
import { useForm } from '@mantine/form';
import { Flex, useMantineTheme } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t } from '@lingui/macro';
import { DrawerContext, FilterButtonsBar, FilterFormWrapper } from '../../../shared/ui/filter-panel';
import { FilterSkeleton } from './filter-skeleton';
import { queryParamsNames } from '../../../app/config/api-constants';
import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { SelectorWithSearchStore } from 'features/selector-with-search-store';
import { typeReturnForm } from 'features/selector-with-search-store/types';
import { SelectorWithSearchUsers } from 'features/selector-with-search-users';
import { DatesProviderWithLocale } from 'shared/providers/dates-provider-with-locale/dates-provider-with-locale';
import { DatePickerInput } from '@mantine/dates';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

export const WorkingShiftsListFilter: React.FC = () => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const close: undefined | (() => void) = useContext(DrawerContext);

    const form = useForm<typeWorkingShiftsFilterForm>(workingShiftsFilterForm);

    const urlParams = useUrlParams();

    useEffect(() => {

        const cashierId = urlParams.getFilterValue('cashierId');
        const store = urlParams.getFilterValue('storeId');

        if (cashierId && typeof cashierId === 'string') form.setValues({ cashierId: cashierId });
        if (store && typeof store === 'string') form.setValues({ storeId: store });

        const closedAtFrom = urlParams.getFilterValue('closedAtFrom');
        const closedAtTo = urlParams.getFilterValue('closedAtTo');
        if (closedAtTo && typeof closedAtTo === 'string' && closedAtFrom && typeof closedAtFrom === 'string') form.setValues({ closedAt: [ new Date(closedAtFrom), new Date(closedAtTo) ] });


    }, []);


    const setFilterHandler = () => {

        const filterObj: Record<string, unknown> = {
            cashierId: form.values.cashierId,
            storeId: form.values.storeId,
            closedAtFrom: form.values.closedAt[0] ? (form.values.closedAt[0]).toISOString() : null,
            closedAtTo: form.values.closedAt[1] ? (form.values.closedAt[1]).toISOString() : null,
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
            { (!urlParams)
                ? <FilterSkeleton/>
                : <form onSubmit={ form.onSubmit(setFilterHandler) } onReset={ form.onReset }>
                    <Flex rowGap={ 16 } direction={ 'column' }>
                        <SelectorWithSearchStore
                            required={ false }
                            fieldName={ 'storeId' }
                            initialValue={ form.values.storeId !== null ? form.values.storeId : null }
                            form={ form as unknown as typeReturnForm }/>

                        <SelectorWithSearchUsers
                            required={ false }
                            fieldName={ 'cashierId' }
                            label={t`Cashier`}
                            form={ form as unknown as typeReturnForm }
                            initialValue={ form.values.cashierId !== null ? form.values.cashierId : null }
                        />

                        <DatesProviderWithLocale>
                            <DatePickerInput
                                type="range"
                                clearable
                                valueFormat="DD MMMM YYYY"
                                label={ i18n._(t`Closing date`) }
                                { ...{ placeholder: i18n._(t`dd.mm.yyyy - dd.mm.yyyy`) } }
                                { ...form.getInputProps('closedAt') }
                                minDate={ new Date('2020-01-01') }
                                maxDate={ new Date() }
                                sx={ { '& .mantine-DatePickerInput-placeholder': { color: theme.colors.gray[3] } } }
                                rightSection={<CalendarDaysIcon style={{width:'20px', height:'20px', cursor:'pointer'}} />}
                                styles={ {
                                    rightSection: {
                                        pointerEvents: 'none',
                                        pointer: 'pointer',
                                    },
                                } }
                            />
                        </DatesProviderWithLocale>

                    </Flex>
                    <FilterButtonsBar onReset={ onReset }/>
                </form>
            }
        </FilterFormWrapper>
    );

};

import { typeQuickFilter, typeSalesFilterForm } from '../types/types';
import React, { useContext, useEffect, useState } from 'react';
import { salesFilterForm } from '../forms/forms';
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
import { SelectorWithSearchTerminals } from 'features/selector-with-search-terminals';
import { FilterButtonPanel } from 'shared/ui/filter-button-panel';
import dayjs from 'dayjs';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

export const SalesListFilter: React.FC = () => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const close: undefined | (() => void) = useContext(DrawerContext);

    const form = useForm<typeSalesFilterForm>(salesFilterForm);

    const urlParams = useUrlParams();

    useEffect(() => {

        const employeeId = urlParams.getFilterValue('employeeId');
        const store = urlParams.getFilterValue('storeId');
        const terminalId = urlParams.getFilterValue('terminalId');
        const quickData = urlParams.getFilterValue('quickDataFilter');

        if (employeeId && typeof employeeId === 'string') form.setValues({ employeeId: employeeId });
        if (store && typeof store === 'string') form.setValues({ storeId: store });
        if (terminalId && typeof terminalId === 'string') form.setValues({ terminalId: terminalId });
        if (quickData && typeof quickData === 'string') setQuickDataFilter(quickData as typeQuickFilter);

        const soldAtFrom = urlParams.getFilterValue('soldAtFrom');
        const soldAtTo = urlParams.getFilterValue('soldAtTo');
        if (soldAtTo && typeof soldAtTo === 'string' && soldAtFrom && typeof soldAtFrom === 'string') form.setValues({ soldAt: [ new Date(soldAtFrom), new Date(soldAtTo) ] });


    }, []);


    const setFilterHandler = () => {

        const filterObj: Record<string, unknown> = {
            employeeId: form.values.employeeId,
            storeId: form.values.storeId,
            terminalId: form.values.terminalId,
            soldAtFrom: form.values.soldAt[0] ? (form.values.soldAt[0]).toISOString() : null,
            soldAtTo: form.values.soldAt[1] ? (form.values.soldAt[1]).toISOString() : null,
            quickDataFilter: quickDataFilter
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
        setQuickDataFilter(null)
        form.reset();

    };

    const [ quickDataFilter, setQuickDataFilter ] = useState<typeQuickFilter>(null);

    useEffect(() => {
        if (quickDataFilter) {

            if (quickDataFilter === 'yesterday') {

                const dateNow = dayjs();
                const soldAtTo = dateNow.subtract(1, 'day').set('hour', 23).set('minute', 59).set('second', 59).set('millisecond', 999).toISOString();
                const soldAtFrom = dateNow.subtract(1, 'day').set('hour', 0).set('minute', 0).set('second', 0).toISOString();
                form.setValues({ soldAt: [ new Date(soldAtFrom), new Date(soldAtTo) ] });
            }
            if (quickDataFilter === 'today') {
                const dateNow = dayjs();
                const soldAtFrom = dateNow.set('hour', 0).set('minute', 0).set('second', 0).toISOString();
                const soldAtTo = dateNow.set('hour', 23).set('minute', 59).set('second', 59).set('millisecond', 999).toISOString();
                form.setValues({ soldAt: [ new Date(soldAtFrom), new Date(soldAtTo) ] });
            }
            if (quickDataFilter === 'last month') {
                const dateNow = dayjs();
                const soldAtTo = dateNow.toISOString();
                const soldAtFrom = dateNow.subtract(1, 'month').set('hour', 0).set('minute', 0).set('second', 0).toISOString();
                form.setValues({ soldAt: [ new Date(soldAtFrom), new Date(soldAtTo) ] });
            }
            if (quickDataFilter === 'last week') {
                const dateNow = dayjs();
                const soldAtTo = dateNow.toISOString();
                const soldAtFrom = dateNow.subtract(1, 'week').set('hour', 0).set('minute', 0).set('second', 0).toISOString();
                form.setValues({ soldAt: [ new Date(soldAtFrom), new Date(soldAtTo) ] });
            }

        }
    }, [ quickDataFilter ]);

    const onChangeQuickDataFilterHandler = (newValue: null | boolean | number | string) => {

        if (quickDataFilter === newValue) {

            setQuickDataFilter(null);

        } else {

            setQuickDataFilter(newValue as typeQuickFilter);

        }

    };

    return (
        <FilterFormWrapper>
            { (!urlParams)
                ? <FilterSkeleton/>
                : <form onSubmit={ form.onSubmit(setFilterHandler) } onReset={ form.onReset }>
                    <Flex rowGap={ 16 } direction={ 'column' }>
                        <SelectorWithSearchUsers
                            required={ false }
                            fieldName={ 'employeeId' }
                            form={ form as unknown as typeReturnForm }
                            initialValue={ form.values.employeeId !== null ? form.values.employeeId : null }
                        />
                        <SelectorWithSearchStore
                            required={ false }
                            fieldName={ 'storeId' }
                            initialValue={ form.values.storeId !== null ? form.values.storeId : null }
                            form={ form as unknown as typeReturnForm }/>

                        <SelectorWithSearchTerminals
                            required={ false }
                            fieldName={ 'terminalId' }
                            initialValue={ form.values.terminalId !== null ? form.values.terminalId : null }
                            form={ form as unknown as typeReturnForm }/>


                        <DatesProviderWithLocale>
                            <DatePickerInput
                                type="range"
                                clearable
                                valueFormat="DD MMMM YYYY"
                                label={ i18n._(t`Creation date`) }
                                { ...{placeholder:i18n._(t`dd.mm.yyyy - dd.mm.yyyy`)} }
                                { ...form.getInputProps('soldAt') }
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

                        <FilterButtonPanel

                            value={ quickDataFilter }
                            onChange={ onChangeQuickDataFilterHandler }
                            data={ [ {
                                value: 'today',
                                label: i18n._(t`Today`),
                            }, {
                                value: 'last week',
                                label: i18n._(t`Last week`),
                            }
                            ] }
                        />
                        <FilterButtonPanel

                            value={ quickDataFilter }
                            onChange={ onChangeQuickDataFilterHandler }
                            data={ [  {
                                value: 'yesterday',
                                label: i18n._(t`Yesterday`),
                            }, {
                                value: 'last month',
                                label: i18n._(t`Last month`),
                            } ] }
                        />
                    </Flex>
                    <FilterButtonsBar onReset={ onReset }/>
                </form>
            }
        </FilterFormWrapper>
    );

};

import { typeQuickFilter, typeZReportsFilterForm } from '../types/types';
import React, { useContext, useEffect, useState } from 'react';
import { zReportFilterForm } from '../forms/forms';
import { useForm } from '@mantine/form';
import {Flex, TextInput, useMantineTheme} from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t } from '@lingui/macro';
import { DrawerContext, FilterButtonsBar, FilterFormWrapper } from '../../../shared/ui/filter-panel';
import { FilterSkeleton } from './filter-skeleton';
import { queryParamsNames } from '../../../app/config/api-constants';
import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { SelectorWithSearchStore } from 'features/selector-with-search-store';
import { typeReturnForm } from 'features/selector-with-search-store/types';
import { DatesProviderWithLocale } from 'shared/providers/dates-provider-with-locale/dates-provider-with-locale';
import { DatePickerInput } from '@mantine/dates';
import { FilterButtonPanel } from 'shared/ui/filter-button-panel';
import dayjs from 'dayjs';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { DateSelectorComponent } from 'shared/ui/date-selector-component/date-selector-component';

export const ZReportListFilter: React.FC = () => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const close: undefined | (() => void) = useContext(DrawerContext);

    const form = useForm<typeZReportsFilterForm>(zReportFilterForm);

    const urlParams = useUrlParams();

    useEffect(() => {

        const fiscalId = urlParams.getFilterValue('fiscalId');
        const store = urlParams.getFilterValue('storeId');
        const terminalSN = urlParams.getFilterValue('terminalSN');
        const quickData = urlParams.getFilterValue('quickDataFilter');

        if (fiscalId && typeof fiscalId === 'string') form.setValues({ fiscalId: fiscalId });
        if (store && typeof store === 'string') form.setValues({ storeId: store });
        if (terminalSN && typeof terminalSN === 'string') form.setValues({ terminalSN: terminalSN });
        if (quickData && typeof quickData === 'string') setQuickDataFilter(quickData as typeQuickFilter);

        const closeDateFrom = urlParams.getFilterValue('refundedAtFrom');
        const closeDateTo = urlParams.getFilterValue('refundedAtTo');
        if (closeDateTo && typeof closeDateTo === 'string' && closeDateFrom && typeof closeDateFrom === 'string') form.setValues({ closeDate: [ new Date(closeDateFrom), new Date(closeDateTo) ] });


    }, []);


    const setFilterHandler = () => {

        const filterObj: Record<string, unknown> = {
            fiscalId: form.values.fiscalId,
            storeId: form.values.storeId,
            terminalSN: form.values.terminalSN,
            closeDateFrom: form.values.closeDate[0] ? (form.values.closeDate[0]).toISOString() : null,
            closeDateTo: form.values.closeDate[1] ? (form.values.closeDate[1]).toISOString() : null,
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
                const refundedAtTo = dateNow.subtract(1, 'day').set('hour', 23).set('minute', 59).set('second', 59).set('millisecond', 999).toISOString();
                const refundedAtFrom = dateNow.subtract(1, 'day').set('hour', 0).set('minute', 0).set('second', 0).toISOString();
                form.setValues({ closeDate: [ new Date(refundedAtFrom), new Date(refundedAtTo) ] });
            }
            if (quickDataFilter === 'today') {
                const dateNow = dayjs();
                const refundedAtFrom = dateNow.set('hour', 0).set('minute', 0).set('second', 0).toISOString();
                const refundedAtTo = dateNow.set('hour', 23).set('minute', 59).set('second', 59).set('millisecond', 999).toISOString();
                form.setValues({ closeDate: [ new Date(refundedAtFrom), new Date(refundedAtTo) ] });
            }
            if (quickDataFilter === 'last month') {
                const dateNow = dayjs();
                const refundedAtTo = dateNow.toISOString();
                const refundedAtFrom = dateNow.subtract(1, 'month').set('hour', 0).set('minute', 0).set('second', 0).toISOString();
                form.setValues({ closeDate: [ new Date(refundedAtFrom), new Date(refundedAtTo) ] });
            }
            if (quickDataFilter === 'last week') {
                const dateNow = dayjs();
                const refundedAtTo = dateNow.toISOString();
                const refundedAtFrom = dateNow.subtract(1, 'week').set('hour', 0).set('minute', 0).set('second', 0).toISOString();
                form.setValues({ closeDate: [ new Date(refundedAtFrom), new Date(refundedAtTo) ] });
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
                        <TextInput
                            label={i18n._(t`Fiscal card ID`)}
                            placeholder={i18n._(t`Type Fiscal card ID`)}
                            required={ false }
                            { ...form.getInputProps('fiscalId') }
                            sx={ theme => ({ '& input::placeholder': { color: theme.colors.gray[3] },}) }
                        />
                        <SelectorWithSearchStore
                            required={ false }
                            fieldName={ 'storeId' }
                            initialValue={ form.values.storeId !== null ? form.values.storeId : null }
                            form={ form as unknown as typeReturnForm }/>

                        <TextInput
                            label={i18n._(t`Terminal SN`)}
                            placeholder={i18n._(t`Type Terminal SN`)}
                            required={ false }
                            { ...form.getInputProps('terminalSN') }
                            sx={ theme => ({ '& input::placeholder': { color: theme.colors.gray[3] },}) }
                        />

                        <DateSelectorComponent
                            label={ i18n._(t`Creation date`) }
                            fieldName={ 'closeDate' }
                            form={ form as unknown as typeReturnForm }
                            quickDataFilter={ quickDataFilter }
                            setQuickDataFilter={ setQuickDataFilter }/>

                    </Flex>
                    <FilterButtonsBar onReset={ onReset }/>
                </form>
            }
        </FilterFormWrapper>
    );

};

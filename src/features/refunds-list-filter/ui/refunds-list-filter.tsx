import { typeQuickFilter, typeRefundsFilterForm } from '../types/types';
import React, { useContext, useEffect, useState } from 'react';
import { refundsFilterForm } from '../forms/forms';
import { useForm } from '@mantine/form';
import { Flex, } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t } from '@lingui/macro';
import { DrawerContext, FilterButtonsBar, FilterFormWrapper } from '../../../shared/ui/filter-panel';
import { FilterSkeleton } from './filter-skeleton';
import { queryParamsNames } from '../../../app/config/api-constants';
import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { SelectorWithSearchStore } from 'features/selector-with-search-store';
import { typeReturnForm } from 'features/selector-with-search-store/types';
import { SelectorWithSearchUsers } from 'features/selector-with-search-users';
import { SelectorWithSearchTerminals } from 'features/selector-with-search-terminals';
import { DateSelectorComponent } from 'shared/ui/date-selector-component/date-selector-component';
import dayjs from 'dayjs';

export const RefundsListFilter: React.FC = () => {

    const { i18n } = useLingui();

    const close: undefined | (() => void) = useContext(DrawerContext);

    const form = useForm<typeRefundsFilterForm>(refundsFilterForm);

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

        const refundedAtFrom = urlParams.getFilterValue('refundedAtFrom');
        const refundedAtTo = urlParams.getFilterValue('refundedAtTo');
        if (refundedAtTo && typeof refundedAtTo === 'string' && refundedAtFrom && typeof refundedAtFrom === 'string') form.setValues({ refundedAt: [ new Date(refundedAtFrom), new Date(refundedAtTo) ] });


    }, []);


    const setFilterHandler = () => {

        const filterObj: Record<string, unknown> = {
            employeeId: form.values.employeeId,
            storeId: form.values.storeId,
            terminalId: form.values.terminalId,
            refundedAtFrom: form.values.refundedAt[0] ? (form.values.refundedAt[0]).toISOString() : null,
            refundedAtTo: form.values.refundedAt[1] ? dayjs(form.values.refundedAt[1]).set('hour', 23).set('minute', 59).set('second', 59).set('millisecond', 999).toISOString() : null,
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

                        <DateSelectorComponent
                            label={ i18n._(t`Creation date`) }
                            fieldName={ 'refundedAt' }
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

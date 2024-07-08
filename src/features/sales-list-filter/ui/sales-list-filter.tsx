import { typeSalesFilterForm } from '../types/types';
import React, { useContext, useEffect, useState } from 'react';
import { salesFilterForm } from '../forms/forms';
import { useForm } from '@mantine/form';
import { Flex } from '@mantine/core';
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
import dayjs from 'dayjs';
import { typeQuickFilter } from 'shared/ui/date-selector-component/types';
import { DateSelectorComponent } from 'shared/ui/date-selector-component/date-selector-component';

export const SalesListFilter: React.FC = () => {

    const { i18n } = useLingui();

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
            soldAtTo: form.values.soldAt[1] ? dayjs(form.values.soldAt[1]).set('h', 23).set('m', 59).set('s', 59).toISOString() : null,
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
        setQuickDataFilter(null);
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
                            fieldName={ 'soldAt' }
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

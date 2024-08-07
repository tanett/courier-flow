import { typeEncashmentFilterForm } from '../types/types';
import React, { useContext, useEffect, useState } from 'react';
import { encashmentFilterForm } from '../forms/forms';
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
import dayjs from 'dayjs';
import { typeQuickFilter } from 'shared/ui/date-selector-component/types';
import { DateSelectorComponent } from 'shared/ui/date-selector-component/date-selector-component';

export const EncashmentListFilter: React.FC = () => {

    const { i18n } = useLingui();

    const close: undefined | (() => void) = useContext(DrawerContext);

    const form = useForm<typeEncashmentFilterForm>(encashmentFilterForm);

    const urlParams = useUrlParams();

    useEffect(() => {

        const employeeId = urlParams.getFilterValue('employeeId');
        const store = urlParams.getFilterValue('storeId');
        const quickData = urlParams.getFilterValue('quickDataFilter');

        if (employeeId && typeof employeeId === 'string') form.setValues({ employeeId: employeeId });
        if (store && typeof store === 'string') form.setValues({ storeId: store });
        if (quickData && typeof quickData === 'string') setQuickDataFilter(quickData as typeQuickFilter);

        const encashedAtFrom = urlParams.getFilterValue('soldAtFrom');
        const encashedAtTo = urlParams.getFilterValue('soldAtTo');
        if (encashedAtTo && typeof encashedAtTo === 'string' && encashedAtFrom && typeof encashedAtFrom === 'string') form.setValues({ encashedAt: [ new Date(encashedAtFrom), new Date(encashedAtTo) ] });


    }, []);


    const setFilterHandler = () => {

        const filterObj: Record<string, unknown> = {
            employeeId: form.values.employeeId,
            storeId: form.values.storeId,
            encashedAtFrom: form.values.encashedAt[ 0 ] ? (form.values.encashedAt[ 0 ]).toISOString() : null,
            encashedAtTo: form.values.encashedAt[ 1 ] ? dayjs(form.values.encashedAt[ 1 ]).set('h', 23).set('m', 59).set('s', 59).toISOString() : null,
            quickDataFilter: quickDataFilter,
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

                        <SelectorWithSearchStore
                            required={ false }
                            fieldName={ 'storeId' }
                            initialValue={ form.values.storeId !== null ? form.values.storeId : null }
                            form={ form as unknown as typeReturnForm }/>

                        <SelectorWithSearchUsers
                            required={ false }
                            fieldName={ 'employeeId' }
                            form={ form as unknown as typeReturnForm }
                            initialValue={ form.values.employeeId !== null ? form.values.employeeId : null }
                        />

                        {/* <SelectorWithSearchTerminals
                            required={ false }
                            fieldName={ 'terminalId' }
                            initialValue={ form.values.terminalId !== null ? form.values.terminalId : null }
                            form={ form as unknown as typeReturnForm }/> */}

                        <DateSelectorComponent
                            label={ i18n._(t`Creation date`) }
                            fieldName={ 'encashedAt' }
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

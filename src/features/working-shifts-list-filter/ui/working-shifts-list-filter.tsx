import { typeWorkingShiftsFilterForm } from '../types/types';
import React, { useContext, useEffect } from 'react';
import { workingShiftsFilterForm } from '../forms/forms';
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
import { DateSelectorComponent } from 'shared/ui/date-selector-component/date-selector-component';

export const WorkingShiftsListFilter: React.FC = () => {

    const { i18n } = useLingui();

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
            closedAtTo: form.values.closedAt[1] ? dayjs(form.values.closedAt[1]).set('h', 23).set('m', 59).set('s', 59).toISOString() : null,
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
                        <DateSelectorComponent
                            label={ i18n._(t`Closing date`) }
                            fieldName={ 'closedAt' }
                            form={ form as unknown as typeReturnForm }
                        />

                    </Flex>
                    <FilterButtonsBar onReset={ onReset }/>
                </form>
            }
        </FilterFormWrapper>
    );

};

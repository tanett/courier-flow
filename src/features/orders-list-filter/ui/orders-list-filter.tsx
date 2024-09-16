import { typeOrdersFilterForm } from '../types/types';
import React, { useContext, useEffect, useState } from 'react';
import { ordersFilterForm } from '../forms/forms';
import { useForm } from '@mantine/form';
import { Flex, Select, type SelectItem } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t } from '@lingui/macro';
import { DrawerContext, FilterButtonsBar, FilterFormWrapper } from '../../../shared/ui/filter-panel';
import { FilterSkeleton } from './filter-skeleton';
import { queryParamsNames } from '../../../app/config/api-constants';
import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import dayjs from 'dayjs';
import { DateSelectorComponent } from 'shared/ui/date-selector-component/date-selector-component';
import { IconChevronDown } from '@tabler/icons-react';
import { useSelectorT } from 'app/state';
import { typeReturnForm } from 'app/utils/error-handler-for-form';

export const OrdersListFilter: React.FC = () => {

    const { i18n } = useLingui();

    const close: undefined | (() => void) = useContext(DrawerContext);

    const statuses = useSelectorT(state => state.orders.statuses);

    const [ statusList, setStatusList ] = useState<SelectItem[]>([]);

    useEffect(() => {

        if (statuses){

            setStatusList(statuses.map(item => ({ value: item.code, label: item.name })));

        }

    }, [ statuses ]);

    const form = useForm<typeOrdersFilterForm>(ordersFilterForm);

    const urlParams = useUrlParams();

    useEffect(() => {

        const collectorId = urlParams.getFilterValue('collectorId');
        const courierId = urlParams.getFilterValue('courierId');
        const store = urlParams.getFilterValue('storeId');
        const status = urlParams.getFilterValue('status');

        // const quickData = urlParams.getFilterValue('quickDataFilter');

        if (collectorId && typeof collectorId === 'string') form.setValues({ collectorId: collectorId });
        if (store && typeof store === 'string') form.setValues({ storeId: store });
        if (courierId && typeof courierId === 'string') form.setValues({ courierId: courierId });

        // if (quickData && typeof quickData === 'string') setQuickDataFilter(quickData as typeQuickFilter);
        if (status && typeof status === 'string') form.setValues({ status: status });

        const orderedAtFrom = urlParams.getFilterValue('orderedAtFrom');
        const orderedAtTo = urlParams.getFilterValue('orderedAtTo');
        if (orderedAtTo && typeof orderedAtTo === 'string' && orderedAtFrom && typeof orderedAtFrom === 'string') form.setValues({ orderedAt: [ new Date(orderedAtFrom), new Date(orderedAtTo) ] });


    }, []);


    const setFilterHandler = () => {

        const filterObj: Record<string, unknown> = {
            collectorId: form.values.collectorId,
            storeId: form.values.storeId,
            courierId: form.values.courierId,
            status: form.values.status,
            orderedAtFrom: form.values.orderedAt[ 0 ] ? (form.values.orderedAt[ 0 ]).toISOString() : null,
            orderedAtTo: form.values.orderedAt[ 1 ] ? dayjs(form.values.orderedAt[ 1 ]).set('h', 23).set('m', 59).set('s', 59).toISOString() : null,

            // quickDataFilter: quickDataFilter
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

        // setQuickDataFilter(null);
        form.reset();

    };

    //  const [ quickDataFilter, setQuickDataFilter ] = useState<typeQuickFilter>(null);


    return (
        <FilterFormWrapper>
            { (!urlParams)
                ? <FilterSkeleton/>
                : <form onSubmit={ form.onSubmit(setFilterHandler) } onReset={ form.onReset }>
                    <Flex rowGap={ 16 } direction={ 'column' }>

                        <Select
                            withinPortal
                            clearable
                            label={ t`Status` }
                            data={ statusList }

                            { ...form.getInputProps('status') }
                            rightSection={!form.values.status && <IconChevronDown size="1rem"/> }
                            styles={ {
                                rightSection: {
                                    pointerEvents: 'none',
                                    pointer: 'pointer',
                                },
                            } }
                            sx={ { '&.mantine-Select-root div[aria-expanded=true] .mantine-Select-rightSection': { transform: 'rotate(180deg)' } } }
                        />

                        <DateSelectorComponent
                            label={ i18n._(t`Date`) }
                            fieldName={ 'orderedAt' }
                            form={ form as unknown as typeReturnForm }
                        />

                    </Flex>
                    <FilterButtonsBar onReset={ onReset }/>
                </form>
            }
        </FilterFormWrapper>
    );

};

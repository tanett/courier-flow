import { typeCreditsFilterForm, typeQuickFilter } from '../types/types';
import React, { useContext, useEffect, useState } from 'react';
import { creditsFilterForm } from '../forms/forms';
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
import { FilterButtonPanel } from 'shared/ui/filter-button-panel';
import dayjs from 'dayjs';
import { DateSelectorComponent } from 'shared/ui/date-selector-component/date-selector-component';

export const CreditsListFilter: React.FC = () => {

    const { i18n } = useLingui();

    const close: undefined | (() => void) = useContext(DrawerContext);

    const form = useForm<typeCreditsFilterForm>(creditsFilterForm);

    const urlParams = useUrlParams();

    useEffect(() => {

        // const employeeId = urlParams.getFilterValue('employeeId');
        const store = urlParams.getFilterValue('storeId');

        // const terminalId = urlParams.getFilterValue('terminalId');
        const quickData = urlParams.getFilterValue('quickDataFilter');
        const status = urlParams.getFilterValue('status');

        // if (employeeId && typeof employeeId === 'string') form.setValues({ employeeId: employeeId });
        if (store && typeof store === 'string') form.setValues({ storeId: store });

        // if (terminalId && typeof terminalId === 'string') form.setValues({ terminalId: terminalId });
        if (quickData && typeof quickData === 'string') setQuickDataFilter(quickData as typeQuickFilter);
        if (status && typeof status === 'string') form.setValues({ status: status === 'PAID' });

        const createdOnTerminalAtFrom = urlParams.getFilterValue('createdOnTerminalAtFrom');
        const createdOnTerminalAtTo = urlParams.getFilterValue('createdOnTerminalAtTo');
        if (createdOnTerminalAtTo && typeof createdOnTerminalAtTo === 'string' && createdOnTerminalAtFrom && typeof createdOnTerminalAtFrom === 'string') form.setValues({ createdOnTerminalAt: [ new Date(createdOnTerminalAtFrom), new Date(createdOnTerminalAtTo) ] });


    }, []);


    const setFilterHandler = () => {

        const filterObj: Record<string, unknown> = {

            // employeeId: form.values.employeeId,
            status: form.values.status !== null ? form.values.status ? 'PAID' : 'NOT_PAID' : null,
            storeId: form.values.storeId,

            // terminalId: form.values.terminalId,
            createdOnTerminalAtFrom: form.values.createdOnTerminalAt[ 0 ] ? (form.values.createdOnTerminalAt[ 0 ]).toISOString() : null,
            createdOnTerminalAtTo: form.values.createdOnTerminalAt[ 1 ] ? dayjs(form.values.createdOnTerminalAt[ 1 ]).set('hour', 23).set('minute', 59).set('second', 59).set('millisecond', 999).toISOString() : null,
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

    const onChangeStateCreditHandler = (newValue: null | boolean | number | string) => {

        if (form.values.status === newValue) {

            form.setValues((prev) => ({
                ...prev,
                status: null,
            }));

        } else {

            form.setValues((prev) => ({
                ...prev,
                status: newValue as boolean | null,
            }));

        }

    };

    return (
        <FilterFormWrapper>
            { (!urlParams)
                ? <FilterSkeleton/>
                : <form onSubmit={ form.onSubmit(setFilterHandler) } onReset={ form.onReset }>
                    <Flex rowGap={ 16 } direction={ 'column' }>
                        {/* <SelectorWithSearchCashDesck */}
                        {/*     required={ false } */}
                        {/*     fieldName={ 'employeeId' } */}
                        {/*     form={ form as unknown as typeReturnForm } */}
                        {/*     initialValue={ form.values.employeeId !== null ? form.values.employeeId : null } */}
                        {/* /> */}
                        <FilterButtonPanel
                            label={i18n._(t`State`)}
                            value={ form.values.status }
                            onChange={ onChangeStateCreditHandler }
                            data={ [ {
                                value: true,
                                label: i18n._(t`Paid`),
                            }, {
                                value: false,
                                label: i18n._(t`Not paid`),
                            } ] }
                        />
                        <SelectorWithSearchStore
                            required={ false }
                            fieldName={ 'storeId' }
                            initialValue={ form.values.storeId !== null ? form.values.storeId : null }
                            form={ form as unknown as typeReturnForm }/>

                        {/* <SelectorWithSearchTerminals */}
                        {/*     required={ false } */}
                        {/*     fieldName={ 'terminalId' } */}
                        {/*     initialValue={ form.values.terminalId !== null ? form.values.terminalId : null } */}
                        {/*     form={ form as unknown as typeReturnForm }/> */}

                        <DateSelectorComponent
                            label={ i18n._(t`Date`) }
                            fieldName={ 'createdOnTerminalAt' }
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

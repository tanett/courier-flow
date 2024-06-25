import { typeTerminalConfigurationsFilterForm } from '../types/types';
import React, { useContext, useEffect } from 'react';
import { terminalConfigurationsFilterForm } from '../forms/forms';
import { useForm } from '@mantine/form';
import { Flex } from '@mantine/core';
import { DrawerContext, FilterButtonsBar, FilterFormWrapper } from '../../../shared/ui/filter-panel';
import { FilterSkeleton } from './filter-skeleton';
import { queryParamsNames } from '../../../app/config/api-constants';
import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { SelectorWithSearchStore } from 'features/selector-with-search-store';
import { typeReturnForm } from 'features/selector-with-search-store/types';
import { SelectorWithSearchTerminals } from 'features/selector-with-search-terminals';


export const TerminalConfigurationsListFilter: React.FC = () => {

    const close: undefined | (() => void) = useContext(DrawerContext);

    const form = useForm<typeTerminalConfigurationsFilterForm>(terminalConfigurationsFilterForm);

    const urlParams = useUrlParams();

    useEffect(() => {

        const store = urlParams.getFilterValue('storeId');
        const terminalId = urlParams.getFilterValue('terminalId');

        if (store && typeof store === 'string') form.setValues({ storeId: store });
        if (terminalId && typeof terminalId === 'string') form.setValues({ terminalId: terminalId });

    }, []);


    const setFilterHandler = () => {

        const filterObj: Record<string, unknown> = {
            storeId: form.values.storeId,
            terminalId: form.values.terminalId,

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

                        <SelectorWithSearchTerminals
                            required={ false }
                            fieldName={ 'terminalId' }
                            initialValue={ form.values.terminalId !== null ? form.values.terminalId : null }
                            form={ form as unknown as typeReturnForm }/>

                    </Flex>
                    <FilterButtonsBar onReset={ onReset }/>
                </form>
            }
        </FilterFormWrapper>
    );

};

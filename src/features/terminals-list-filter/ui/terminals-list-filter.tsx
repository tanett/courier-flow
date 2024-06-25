import { typeTerminalsFilterForm } from '../types/types';
import React, { useContext, useEffect } from 'react';
import { terminalsFilterForm } from '../forms/forms';
import { useForm } from '@mantine/form';
import { Flex, TextInput } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t, Trans } from '@lingui/macro';
import { DrawerContext, FilterButtonsBar, FilterFormWrapper } from '../../../shared/ui/filter-panel';
import { FilterSkeleton } from './filter-skeleton';
import { queryParamsNames } from '../../../app/config/api-constants';
import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { FilterButtonPanel } from 'shared/ui/filter-button-panel';
import { SelectorWithSearchStore } from 'features/selector-with-search-store';
import { typeReturnForm } from 'features/selector-with-search-store/types';


export const TerminalsListFilter: React.FC = () => {

    const { i18n } = useLingui();

    const close: undefined | (() => void) = useContext(DrawerContext);

    const form = useForm<typeTerminalsFilterForm>(terminalsFilterForm);

    const urlParams = useUrlParams();

    useEffect(() => {

        const store = urlParams.getFilterValue('storeId');
        const model = urlParams.getFilterValue('model');
        const blocked = urlParams.getFilterValue('blocked');

        if (store && typeof store === 'string') form.setValues({ storeId: store });
        if (model && typeof model === 'string') form.setValues({ model: model });
        if (blocked && typeof blocked === 'string') form.setValues({ blocked: blocked === 'true' });


    }, []);


    const setFilterHandler = () => {

        const filterObj: Record<string, unknown> = {
            storeId: form.values.storeId,
            model: form.values.model.trim() === '' ? null : form.values.model.trim(),
            blocked: form.values.blocked !== null ? form.values.blocked.toString() : null,
        };

        urlParams.setSearchParams({
            [ queryParamsNames.filtersString ]: urlParams.filtersToUri(filterObj),
            [ queryParamsNames.pageNumber ]: undefined,
        });

        if (close) close();

    };

    const onChangeBlockedTerminalHandler = (newValue: null | boolean | number | string) => {

        if (form.values.blocked === newValue) {

            form.setValues((prev) => ({
                ...prev,
                blocked: null,
            }));

        } else {

            form.setValues((prev) => ({
                ...prev,
                blocked: newValue as boolean | null,
            }));

        }

    };

    const onReset = () => {

        urlParams.setSearchParams({
            [ queryParamsNames.filtersString ]: urlParams.filtersToUri({}),
            [ queryParamsNames.pageNumber ]: undefined,
        });
        form.reset();

    };

    return (
        <FilterFormWrapper>
            { (!urlParams)
                ? <FilterSkeleton/>
                : <form onSubmit={ form.onSubmit(setFilterHandler) } onReset={ form.onReset }>
                    <Flex rowGap={ 16 } direction={ 'column' }>
                        <TextInput
                            label={ <Trans>Model</Trans> }
                            { ...form.getInputProps('model') }
                            maxLength={ 150 }
                        />
                        <SelectorWithSearchStore
                            required={ false }
                            fieldName={ 'storeId' }
                            initialValue={ form.values.storeId !== null ? form.values.storeId : null }
                            form={ form as unknown as typeReturnForm }/>

                        <FilterButtonPanel
                            label={i18n._(t`Blocking`)}
                            value={ form.values.blocked }
                            onChange={ onChangeBlockedTerminalHandler }
                            data={ [ {
                                value: true,
                                label: i18n._(t`Blocked`),
                            }, {
                                value: false,
                                label: i18n._(t`Not blocked`),
                            } ] }
                        />
                    </Flex>
                    <FilterButtonsBar onReset={ onReset }/>
                </form>
            }
        </FilterFormWrapper>
    );

};

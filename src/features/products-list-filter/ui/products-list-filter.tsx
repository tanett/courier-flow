import { typeProductsFilterForm } from '../types/types';
import React, { useContext, useEffect } from 'react';
import { productsFilterForm } from '../forms/forms';
import { useForm } from '@mantine/form';
import { Flex, Select, TextInput } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t, Trans } from '@lingui/macro';
import { DrawerContext, FilterButtonsBar, FilterFormWrapper } from '../../../shared/ui/filter-panel';
import { FilterSkeleton } from './filter-skeleton';
import { queryParamsNames } from '../../../app/config/api-constants';
import { useUrlParams } from '../../../shared/hooks/use-url-params/use-url-params';
import { useSelectorT } from 'app/state';
import { SelectorWithSearchStore } from 'features/selector-with-search-store';
import { IconChevronDown } from '@tabler/icons-react';
import { productUnitValueListForSelector } from '../../../entities/products/constants/product-unit-value-list-for-selector';
import { SelectorWithSearchProductCategory } from 'features/selector-with-search-product-category';
import { typeReturnForm } from 'features/selector-with-search-store/types';
import { FilterButtonPanel } from 'shared/ui/filter-button-panel';
import { PRODUCT_UNIT_VALUE } from '../../../entities/products/model/state-slice';

export const ProductsListFilter: React.FC = () => {

    const { i18n } = useLingui();

    const close: undefined | (() => void) = useContext(DrawerContext);

    const form = useForm<typeProductsFilterForm>(productsFilterForm);

    const urlParams = useUrlParams();

    useEffect(() => {

        const store = urlParams.getFilterValue('storeId');
        if (store && typeof store === 'string') form.setValues({ storeId: store });
        const category = urlParams.getFilterValue('categoryId');
        if (category && typeof category === 'string') form.setValues({ categoryId: category });
        const barcode = urlParams.getFilterValue('barcode');
        if (barcode && typeof barcode === 'string') form.setValues({ barcode: barcode });
        const marked = urlParams.getFilterValue('marked');
        if (marked && typeof marked === 'string') form.setValues({ marked: marked === 'true' });
        const unit = urlParams.getFilterValue('unit');
        if (unit && typeof unit === 'string') form.setValues({ unit: PRODUCT_UNIT_VALUE[ unit as PRODUCT_UNIT_VALUE ] });

    }, []);


    const currentUser = useSelectorT(state => state.userProfile.userProfile);


    const setFilterHandler = () => {

        const filterObj: Record<string, unknown> = {
            storeId: form.values.storeId !== undefined ? form.values.storeId : undefined,
            categoryId: form.values.categoryId ? form.values.categoryId : undefined,
            marked: form.values.marked !== null ? form.values.marked.toString() : null,
            barcode: (form.values.barcode && form.values.barcode.trim() !== '') ? form.values.barcode.trim() : undefined,
            unit: form.values.unit !== undefined ? form.values.unit : undefined,
        };

        urlParams.setSearchParams({
            [ queryParamsNames.filtersString ]: urlParams.filtersToUri(filterObj),
            [ queryParamsNames.pageNumber ]: undefined,
        });

        if (close) close();

    };

    const onChangeMarkedHandler = (newValue: null | boolean | number | string) => {

        if (form.values.marked === newValue) {

            form.setValues((prev) => ({ ...prev, marked: null }));

        } else {

            form.setValues((prev) => ({ ...prev, marked: newValue as boolean | null }));

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
            {(!urlParams)
                ? <FilterSkeleton/>
                : <form onSubmit={form.onSubmit(setFilterHandler)} onReset={form.onReset}>
                    <Flex rowGap={16} direction={'column'}>
                        <SelectorWithSearchStore
                            required={ false }
                            fieldName={ 'storeId' }
                            initialValue={form.values.storeId ? form.values.storeId : null}
                            form={ form as unknown as typeReturnForm }/>
                        <TextInput
                            label={ <Trans>Barcode</Trans> }
                            { ...form.getInputProps('barcode') }
                            maxLength={ 30 }
                        />
                        <SelectorWithSearchProductCategory
                            required={false}
                            fieldName={'categoryId'}
                            form={ form as unknown as typeReturnForm }
                            initialValue={null}
                        />
                        <Select
                            clearable
                            label={i18n._(t`Unit`)}
                            data={productUnitValueListForSelector}
                            {...form.getInputProps('unit')}
                            rightSection={form.values.unit ? undefined : <IconChevronDown size="1rem"/> }
                            sx={ { '&.mantine-Select-root div[aria-expanded=true] .mantine-Select-rightSection': { transform: 'rotate(180deg)' } }}
                        />
                        <FilterButtonPanel
                            value={form.values.marked}
                            onChange={onChangeMarkedHandler}
                            data={[ { value: true, label: i18n._(t`Marked`) }, { value: false, label: i18n._(t`Not marked`) } ]}
                        />
                    </Flex>
                    <FilterButtonsBar onReset={onReset}/>
                </form>
            }
        </FilterFormWrapper>
    );

};

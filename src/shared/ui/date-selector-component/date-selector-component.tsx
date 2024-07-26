import { typeDateSelectorComponent, typeQuickFilter } from './types';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { DatesProviderWithLocale } from 'shared/providers/dates-provider-with-locale/dates-provider-with-locale';
import { DatePickerInput } from '@mantine/dates';
import { t } from '@lingui/macro';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { FilterButtonPanel } from 'shared/ui/filter-button-panel';
import { useLingui } from '@lingui/react';
import { useMantineTheme } from '@mantine/core';

export const DateSelectorComponent: React.FC<typeDateSelectorComponent> = ({
    form,
    fieldName,
    quickDataFilter,
    setQuickDataFilter,
    label
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();


    useEffect(() => {
        if (quickDataFilter) {

            if (quickDataFilter === 'yesterday') {

                const dateNow = dayjs();
                const toDate = dateNow.subtract(1, 'day').set('hour', 23).set('minute', 59).set('second', 59).set('millisecond', 999).toISOString();
                const fromDate = dateNow.subtract(1, 'day').set('hour', 0).set('minute', 0).set('second', 0).toISOString();
                form.setValues({ [fieldName]: [ new Date(fromDate), new Date(toDate) ] });
            }
            if (quickDataFilter === 'today') {
                const dateNow = dayjs();
                const fromDate = dateNow.set('hour', 0).set('minute', 0).set('second', 0).toISOString();
                const toDate = dateNow.set('hour', 23).set('minute', 59).set('second', 59).set('millisecond', 999).toISOString();
                form.setValues({ [fieldName]: [ new Date(fromDate), new Date(toDate) ] });
            }
            if (quickDataFilter === 'last month') {
                const dateNow = dayjs();
                const toDate = dateNow.toISOString();
                const fromDate = dateNow.subtract(1, 'month').set('hour', 0).set('minute', 0).set('second', 0).toISOString();
                form.setValues({ [fieldName]: [ new Date(fromDate), new Date(toDate) ] });
            }
            if (quickDataFilter === 'last week') {
                const dateNow = dayjs();
                const toDate = dateNow.toISOString();
                const fromDate = dateNow.subtract(1, 'week').set('hour', 0).set('minute', 0).set('second', 0).toISOString();
                form.setValues({ [fieldName]: [ new Date(fromDate), new Date(toDate) ] });
            }

        }
    }, [ quickDataFilter ]);

    const onChangeQuickDataFilterHandler = (newValue: null | boolean | number | string) => {
        if (quickDataFilter !==undefined && setQuickDataFilter) {
            if (quickDataFilter === newValue) {

                setQuickDataFilter(null);

            } else {

                setQuickDataFilter(newValue as typeQuickFilter);

            }
        }
    };

    return (
        <>
            <DatesProviderWithLocale>
                <DatePickerInput
                    type="range"
                    clearable
                    valueFormat="DD MMMM YYYY"
                    label={ label }
                    { ...{ placeholder: i18n._(t`dd.mm.yyyy - dd.mm.yyyy`) } }
                    { ...form.getInputProps(fieldName) }
                    onChange={(value)=>{
                       if(setQuickDataFilter) setQuickDataFilter(null);
                        form.setValues({ [fieldName]: value });
                    }}
                    minDate={ new Date('2020-01-01') }
                    maxDate={ new Date() }
                    sx={ { '& .mantine-DatePickerInput-placeholder': { color: theme.colors.gray[3] } } }
                    rightSection={ <CalendarDaysIcon style={ {
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer'
                    } }/> }
                    styles={ {
                        rightSection: {
                            pointerEvents: 'none',
                            pointer: 'pointer',
                        },
                    } }
                />
            </DatesProviderWithLocale>
            {quickDataFilter !== undefined && <>
                <FilterButtonPanel

                    value={ quickDataFilter }
                    onChange={ onChangeQuickDataFilterHandler }
                    data={ [ {
                        value: 'today',
                        label: i18n._(t`Today`),
                    }, {
                        value: 'last week',
                        label: i18n._(t`Last week`),
                    }
                    ] }
                />
                <FilterButtonPanel

                    value={ quickDataFilter }
                    onChange={ onChangeQuickDataFilterHandler }
                    data={ [ {
                        value: 'yesterday',
                        label: i18n._(t`Yesterday`),
                    }, {
                        value: 'last month',
                        label: i18n._(t`Last month`),
                    } ] }
                />
            </>}


        </>
    );
};

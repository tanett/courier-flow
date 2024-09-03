import { typeDateSelectorComponent, typeQuickFilter } from './types';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { DatesProviderWithLocale } from 'shared/providers/dates-provider-with-locale/dates-provider-with-locale';
import { DatePickerInput } from '@mantine/dates';
import { t } from '@lingui/macro';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { useLingui } from '@lingui/react';
import { SimpleGrid, useMantineTheme } from '@mantine/core';
import { useStyles } from './styles';
import cn from 'classnames';

export const DateSelectorComponent: React.FC<typeDateSelectorComponent> = ({
    form,
    fieldName,
    quickDataFilter,
    setQuickDataFilter,
    label
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const { classes } = useStyles();

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
                const fromDate = dateNow.subtract(6, 'day').set('hour', 0).set('minute', 0).set('second', 0).toISOString();
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
            {quickDataFilter !== undefined &&
                <SimpleGrid cols={ 2 } sx={ { gap: '18px' } }>
                    <button
                        type="button"
                        onClick={ (e) => {

                            if (e.detail > 0) (e.target as HTMLButtonElement).blur();
                            onChangeQuickDataFilterHandler('today');

                        } }
                        className={ cn(classes.button, { [classes['active']]: 'today' === quickDataFilter }) }
                    >
                        { i18n._(t`Today`) }
                    </button>
                    <button
                        type="button"
                        onClick={ (e) => {

                            if (e.detail > 0) (e.target as HTMLButtonElement).blur();
                            onChangeQuickDataFilterHandler('last week');

                        } }
                        className={ cn(classes.button, { [classes['active']]: 'last week' === quickDataFilter }) }
                    >
                        { i18n._(t`Last week`) }
                    </button>
                    <button
                        type="button"
                        onClick={ (e) => {

                            if (e.detail > 0) (e.target as HTMLButtonElement).blur();
                            onChangeQuickDataFilterHandler('yesterday');

                        } }
                        className={ cn(classes.button, { [classes['active']]: 'yesterday' === quickDataFilter }) }
                    >
                        { i18n._(t`Yesterday`) }
                    </button>
                    <button
                        type="button"
                        onClick={ (e) => {

                            if (e.detail > 0) (e.target as HTMLButtonElement).blur();
                            onChangeQuickDataFilterHandler('last month');

                        } }
                        className={ cn(classes.button, { [classes['active']]: 'last month' === quickDataFilter }) }
                    >
                        { i18n._(`Last month`) }
                    </button>
                </SimpleGrid>

             }


        </>
    );
};

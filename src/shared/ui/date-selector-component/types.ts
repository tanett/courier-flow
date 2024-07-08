import type { UseFormInput } from '@mantine/form/lib/types';
import type { UseFormReturnType } from '@mantine/form';
import React from 'react';

type formType = UseFormInput<Record<string, unknown>>

export type typeReturnForm = UseFormReturnType<formType, (values:formType)=>formType>

export type typeDateSelectorComponent = {
    fieldName: string,
    form: typeReturnForm,
    quickDataFilter?: typeQuickFilter,
    setQuickDataFilter?: React.Dispatch<typeQuickFilter>,
    label: string
}

export type typeQuickFilter = 'yesterday' | 'today' | 'last week' | 'last month' | null

import React from 'react';
import { t } from '@lingui/macro';
import { i18n } from '@lingui/core';

const today = new Date();
const yesterday = new Date(new Date().setDate(today.getDate() - 1));

export const importExportDateFormatter = (sioDate: string) => {

    const date = new Date(sioDate);

    const isToday = date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

    const isYesterday = date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear();

    let totalDate: string | React.ReactElement = date.toLocaleString(undefined, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    if (isToday) totalDate = i18n._(t`today`);

    if (isYesterday) totalDate = i18n._(t`yesterday`);


    const totalTime = date.toLocaleString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
    });

    return { date: totalDate, time: totalTime };

};

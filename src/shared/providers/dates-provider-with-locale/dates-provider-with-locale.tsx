import React, { PropsWithChildren } from 'react';
import 'dayjs/locale/ru';
import 'dayjs/locale/en';
import 'dayjs/locale/uz';
import { DatesProvider } from '@mantine/dates';

export const DatesProviderWithLocale: React.FC<PropsWithChildren> = ({ children }) => {

    const local = localStorage.getItem('i18nextLng');
    return (
        <DatesProvider settings={{ locale: local || 'en', firstDayOfWeek: 1, weekendDays: [ 0, 6 ] }}>
            {children}
        </DatesProvider>
    );

};

import React, { PropsWithChildren } from 'react';
import 'dayjs/locale/ru';
import 'dayjs/locale/en';
import 'dayjs/locale/uz';
import { DatesProvider } from '@mantine/dates';
import { getSystemLanguage } from 'app/providers/with-locales/with-locales';
import { DEFAULT_LANGUAGE } from 'app/config/languages';

export const DatesProviderWithLocale: React.FC<PropsWithChildren> = ({ children }) => {

    const local = getSystemLanguage();
    return (
        <DatesProvider settings={{ locale: local || DEFAULT_LANGUAGE, firstDayOfWeek: 1, weekendDays: [ 0, 6 ] }}>
            {children}
        </DatesProvider>
    );

};

import React, { useEffect } from 'react';
import { i18n } from '@lingui/core';
import { detect, fromNavigator, fromStorage } from '@lingui/detect-locale';
import { I18nProvider } from '@lingui/react';

import { DEFAULT_LANGUAGE } from '../../config/languages';
import { convertLocale } from '../../utils/convertLocale';
import messages from '../../locales/en/messages';

i18n.load(DEFAULT_LANGUAGE, messages);
i18n.activate(DEFAULT_LANGUAGE);

const DEFAULT_FALLBACK = () => DEFAULT_LANGUAGE;

export async function dynamicActivate(locale: string) {

    const { messages } = await import(`../../locales/${locale}/messages`);
    i18n.load(locale, messages);
    i18n.activate(locale);
    localStorage.setItem('i18nextLng', locale);

}

export const getSystemLanguage = () => {

    const rawLanguage = detect(
        fromStorage('i18nextLng'),
        fromNavigator(),
        DEFAULT_FALLBACK
    );
    return rawLanguage ? convertLocale(rawLanguage) : DEFAULT_LANGUAGE;

};

export const withLocales = (component: () => React.ReactNode) => () => {

    useEffect(() => {

        dynamicActivate(getSystemLanguage()).then();

    }, []);

    return (
        <I18nProvider i18n={i18n}>
            { component() }
        </I18nProvider>
    );

};

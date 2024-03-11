import { DEFAULT_LANGUAGE, LANGUAGES } from '../config/languages';

export const convertLocale = (rawLocale: string): LANGUAGES => {

    const patternFull = /^\w{2}(-\w{2})?$/;

    const lowLang = rawLocale.toLowerCase();

    if (patternFull.test(lowLang)) {

        const checkShortLang = Object.values(LANGUAGES).find((item) => item === lowLang.slice(0, 2));

        if (checkShortLang) return checkShortLang;

    }

    return DEFAULT_LANGUAGE;

};

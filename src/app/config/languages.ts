export enum LANGUAGES {
    EN = 'en',
    UZ = 'uz',
    RU = 'ru',
}

// TODO: locale from env
export const DEFAULT_LANGUAGE = LANGUAGES[ 'EN' ];


// Language list
export const locales: {value: LANGUAGES, label: string}[] = [
    { value: LANGUAGES.EN, label: 'English' },
    { value: LANGUAGES.RU, label: 'Русский' },
    { value: LANGUAGES.UZ, label: 'O\'zbek' }
];

// TODO: add types for response
export type typeHeadersObj = {
    [key: string]: string;
}

export const localeHeaderCreator = () => {

    const headers = [];

    // Auth token
    const locale = localStorage.getItem('i18nextLng');
    if (locale) {

        headers.push([ 'Locale', locale ]);

    }


    const headersObj: typeHeadersObj = {};

    headers.forEach(item => {

        const [ key, value ] = item;

        headersObj[ key ] = value;

    });

    return headers.length ? headersObj : undefined;

};

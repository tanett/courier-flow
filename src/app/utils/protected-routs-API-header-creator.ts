// TODO: add types for response
export type typeHeadersObj = {
    [key: string]: string;
}

export const protectedRoutsAPIHeaderCreator = () => {

    const headers = [];

    // Auth token
    const accessToken = sessionStorage.getItem('accessTokenValue');
    if (accessToken) {

        headers.push([ 'Authorization', `Bearer ${accessToken}` ]);

    }


    const headersObj: typeHeadersObj = {};

    headers.forEach(item => {

        const [ key, value ] = item;

        headersObj[ key ] = value;

    });

    return headers.length ? headersObj : undefined;

};

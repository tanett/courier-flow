
export const getCookie = (name: string) => {
    let matches = document.cookie.match(new RegExp(
        // eslint-disable-next-line
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


export const setCookie = (name: string, value: string, options:Record<string, any> = {}) => {
    //console.log('setCookie',name, value)
    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString()
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value)

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey
        let optionValue = options[optionKey]
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue
        }
    }
    //console.log('setCookie',updatedCookie)
    document.cookie = updatedCookie
}


export const deleteCookie = (name: string) => {
    setCookie(name, "", {'max-age': -1,})
}


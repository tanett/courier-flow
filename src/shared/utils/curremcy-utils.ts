import { systemCurrencyObj } from '../../app/config/currency';

export const getCurrencyByCode = (code: string) => {

    if (code in systemCurrencyObj) return systemCurrencyObj[ code ];
    return code;

};

export const makeSelectList = (codeList: string[]): {value: string, label: string }[] => {

    return codeList.map(code => ({ value: code, label: getCurrencyByCode(code) }));

};

export const moreThenXCharacters = (str: string, x: number) => {

    return str.length >= x;

};

export const lessThenXCharacters = (str: string, x: number) => {

    return str.length <= x;

};

export const isCorrectLength = (str: string, min: number, max: number) => {

    return moreThenXCharacters(str, min) && lessThenXCharacters(str, max);

};

export const moreThenXLetters = (str: string, x: number) => {

    const regex = /[a-z]/g;

    const letters = str.match(regex);

    return !!letters && letters.length >= x;

};

export const moreThenXUppercaseLetters = (str: string, x: number) => {

    const regex = /[A-Z]/g;

    const letters = str.match(regex);

    return !!letters && letters.length >= x;

};

export const moreThenXNumbers = (str: string, x: number) => {

    const regex = /[0-9]/g;

    const letters = str.match(regex);

    return !!letters && letters.length >= x;

};

export const isHasEspecialSymbol = (str: string, symbolsArray: string[]) => {

    const regex = new RegExp(`[${symbolsArray.join('')}]`);

    return regex.test(str);

};


export const isNotContainSpaces = (str: string) => {

    const regex = /^\S*$/;

    return regex.test(str);

};

export const isValidPassword = (
    str: string,
    minCharsInPassword: number,
    maxCharsInPassword: number,
    minLettersInPassword: number,
    minUpLettersInPassword: number,
    minNumbersInPassword: number,
    especialSymbolsInPassword: string[]
) => {

    return moreThenXCharacters(str, minCharsInPassword)
        && lessThenXCharacters(str, maxCharsInPassword)
        && moreThenXLetters(str, minLettersInPassword)
        && moreThenXUppercaseLetters(str, minUpLettersInPassword)
        && moreThenXNumbers(str, minNumbersInPassword)
        && isHasEspecialSymbol(str, especialSymbolsInPassword)
        && isNotContainSpaces(str);

};

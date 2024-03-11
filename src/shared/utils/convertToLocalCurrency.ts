
const numberFormat = new Intl.NumberFormat([ 'ru-RU' ], { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const numberCurrencyFormat = (number: number) => {

    return numberFormat.format(number);

};

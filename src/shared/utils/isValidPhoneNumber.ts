import { AsYouType, isPossiblePhoneNumber } from 'libphonenumber-js';

export const isValidPhoneNumberByLength = (value: string): boolean => {

    const asYouType = new AsYouType();
    asYouType.input(value);
    const country = asYouType.getNumber()?.country;

    if (country){

        const number = asYouType.getNationalNumber();

        if (number){

            return isPossiblePhoneNumber(value, country);

        } else {

            return true;

        }

    } else {

        return true;

    }


};

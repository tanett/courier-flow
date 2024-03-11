import { isPossiblePhoneNumber } from 'libphonenumber-js';

export const convertPhoneNumberToStringForApi = (value: string): string | null => {

    if (isPossiblePhoneNumber(value)){

        return value;

    } else {

        return null;

    }


};

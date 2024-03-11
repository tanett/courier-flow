import { t } from '@lingui/macro';
import { typeFormChangePassword } from '../types/types';
import { ESPECIAL_SYMBOLS_IN_PASSWORD, MAX_CHARS_IN_PASSWORD, MIN_CHARS_IN_PASSWORD, MIN_LETTERS_IN_PASSWORD, MIN_NUMBERS_IN_PASSWORD, MIN_UP_LETTERS_IN_PASSWORD } from '../constant/validation.settings';
import { isHasEspecialSymbol, isNotContainSpaces, lessThenXCharacters, moreThenXCharacters, moreThenXLetters, moreThenXNumbers, moreThenXUppercaseLetters } from '../../../shared/ui/with-password-helper/utils';

export const InitialChangePasswordFormObj: typeFormChangePassword = {
    newPassword: '',
    confirmNewPassword: '',
};

export const initialChangePasswordForm = {
    initialValues: InitialChangePasswordFormObj,
    validate: {
        newPassword: (value: string) => {

            return !moreThenXCharacters(value, MIN_CHARS_IN_PASSWORD)
                ? t`Too short password, minimum ${MIN_CHARS_IN_PASSWORD} characters`
                : !lessThenXCharacters(value, MAX_CHARS_IN_PASSWORD)
                    ? t`Password too long, maximum ${MAX_CHARS_IN_PASSWORD} characters`
                    : !moreThenXLetters(value, MIN_LETTERS_IN_PASSWORD)
                        ? t`Less than ${MIN_LETTERS_IN_PASSWORD} characters`
                        : !moreThenXUppercaseLetters(value, MIN_UP_LETTERS_IN_PASSWORD)
                            ? t`Less than ${MIN_UP_LETTERS_IN_PASSWORD} characters`
                            : !moreThenXNumbers(value, MIN_NUMBERS_IN_PASSWORD)
                                ? t`Less than ${MIN_NUMBERS_IN_PASSWORD} digit`
                                : !isHasEspecialSymbol(value, ESPECIAL_SYMBOLS_IN_PASSWORD)
                                    ? t`Not contain special symbols`
                                    : !isNotContainSpaces(value)
                                        ? t`Spaces are not allowed`
                                        : null;

        },
        confirmNewPassword: (value: string, values: typeFormChangePassword) => {

            return value !== values.newPassword
                ? t`Password mismatch`
                : null;

        },
    },
};

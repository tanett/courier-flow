import React from 'react';
import { typeWithPasswordHelperProps } from './types';
import { useStyles } from './styles';
import { Trans } from '@lingui/macro';
import { Rule } from './rule';
import { isCorrectLength, isHasEspecialSymbol, isNotContainSpaces, isValidPassword, moreThenXLetters, moreThenXNumbers, moreThenXUppercaseLetters } from './utils';
import { ESPECIAL_SYMBOLS_IN_PASSWORD, MAX_CHARS_IN_PASSWORD, MIN_CHARS_IN_PASSWORD, MIN_LETTERS_IN_PASSWORD, MIN_NUMBERS_IN_PASSWORD, MIN_UP_LETTERS_IN_PASSWORD } from '../../../features/restore-password/constant/validation.settings';
import { useFocusWithin } from '@mantine/hooks';


export const WithPasswordHelper: React.FC<typeWithPasswordHelperProps> = ({ password, children }) => {

    const { classes } = useStyles();

    const { ref, focused } = useFocusWithin();

    const espSimbolsList = ESPECIAL_SYMBOLS_IN_PASSWORD.map(item => `«${item}»`).join(', ');

    return (
        <div className={classes.wrapper} ref={ref}>
            {children}
            {/* eslint-disable-next-line max-len */}
            {(focused && password && !isValidPassword(password, MIN_CHARS_IN_PASSWORD, MAX_CHARS_IN_PASSWORD, MIN_UP_LETTERS_IN_PASSWORD, MIN_LETTERS_IN_PASSWORD, MIN_NUMBERS_IN_PASSWORD, ESPECIAL_SYMBOLS_IN_PASSWORD)) && <div className={classes.helperWrapper}>
                <div className={classes.helper}>
                    <Rule isCheck={isCorrectLength(password, MIN_CHARS_IN_PASSWORD, MAX_CHARS_IN_PASSWORD)} text={<Trans>{`Length from ${MIN_CHARS_IN_PASSWORD} to ${MAX_CHARS_IN_PASSWORD} characters`}</Trans>}/>
                    <Rule isCheck={moreThenXUppercaseLetters(password, MIN_UP_LETTERS_IN_PASSWORD)} text={<Trans>At least 1 capital letter</Trans>}/>
                    <Rule isCheck={moreThenXLetters(password, MIN_LETTERS_IN_PASSWORD)} text={<Trans>At least 1 lowercase letter</Trans>}/>
                    <Rule isCheck={moreThenXNumbers(password, MIN_NUMBERS_IN_PASSWORD)} text={<Trans>At least 1 digit</Trans>}/>
                    <Rule isCheck={isHasEspecialSymbol(password, ESPECIAL_SYMBOLS_IN_PASSWORD)} text={<Trans>{`At least 1 special character` + ` ${espSimbolsList}` }</Trans>} />
                    <Rule isCheck={isNotContainSpaces(password)} text={<Trans>Without spaces</Trans>}/>
                </div>
            </div>}
        </div>
    );

};

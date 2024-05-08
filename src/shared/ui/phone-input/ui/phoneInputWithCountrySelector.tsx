import React, { useEffect, useState } from 'react';
import { Flex, Input } from '@mantine/core';
import { AsYouType, type CountryCode, getCountryCallingCode } from 'libphonenumber-js';
import { Trans } from '@lingui/macro';
import { useStyles } from './styles';
import { CountrySelect } from './country-selector';
import cn from 'classnames';


export const PhoneInputWithCountrySelector: React.FC<{id?: string, value: string, onChange: any, isRequired: boolean, error?: any, onFocus?: any, onBlur?: any }> = ({
    id,
    value,
    onChange,
    isRequired,
    error,
    onFocus,
    onBlur,
}) => {

    const { classes } = useStyles();

    const [ country, setCountry ] = useState<CountryCode | ''>('');

    useEffect(() => {

        if (value && value !== '') {

            if (country === '') {

                const asYouType = new AsYouType();
                asYouType.input(value);
                const parsedCountry = asYouType.getCountry();
                if (!parsedCountry){

                    if (asYouType.getCallingCode() === '1') setCountry('US');
                    if (asYouType.getCallingCode() === '7') setCountry('RU');


                } else {

                    setCountry(parsedCountry);

                }

            }

        }
        // else {
        //
        //     if (defaultCountryForPhoneInput && country === ''){ // todo fix it
        //
        //         setCountry(defaultCountryForPhoneInput);
        //
        //     }
        //
        // }

    }, [ value ]);


    useEffect(() => {

        if (value !== '' && country !== '') {

            const asYouType = new AsYouType();
            asYouType.input(value);
            const parsedCountry = asYouType.getCountry();
            if (parsedCountry && parsedCountry !== country) {

                const subStart = asYouType.getNumber()?.countryCallingCode.length || value.length;
                onChangeLocal(asYouType.getChars().substring(subStart + 1));

            }
            if (!parsedCountry){

                if (asYouType.getCallingCode() === '1') setCountry('US');
                if (asYouType.getCallingCode() === '7') setCountry('RU');
                onChangeLocal(asYouType.getChars().substring(1));

            }

        }

    }, [ country ]);


    const onChangeLocal = (value: string) => {

        const temp = value.replace(/\D/, '');
        if (temp.trim().length > 0) {

            if (country) {

                const asYouType = new AsYouType(country);
                asYouType.input(temp);
                onChange(asYouType.getNumber()?.number);

            }

        } else {

            if (country) {

                onChange('+' + getCountryCallingCode(country));

            }

        }


    };

    const getFormattedString = () => {

        if (country) {

            const asYouType = new AsYouType(country);
            const call = getCountryCallingCode(country);
            const start = 1 + call.length;
            if (value) {

                const cutValue = value.substring(start);
                const formattedInput = asYouType.input(cutValue);
                return formattedInput;

            } else {

                return '';

            }

        } else {

            if (value !== '') {

                return value.substring(1);

            }
            return '';

        }

    };

    const onInputLocal = (e: React.FormEvent<HTMLInputElement>) => {

        onChange('+' + e.currentTarget.value.replace(/\D/, ''));

    };

    const onPastLocal = (e: React.ClipboardEvent<HTMLInputElement>) => {

        try {

            const clipboardContents = e.clipboardData.getData('text');
            if (clipboardContents) onChangeLocal(clipboardContents);

        } catch (error) {

            console.log(`Clipboard read failed: ${ error }`);

        }

    };


    return (
        <Input.Wrapper
            id={id ? id : Math.random().toString() }
            withAsterisk={ isRequired }
            label={ <Trans>Phone number</Trans> }
            error={ error }
            onFocus={ onFocus }
            onBlur={ onBlur }
            className={ classes.componentWrapper }
        >
            <Flex className={ cn([ classes.inputWrapper, (error && classes.inputWrapperError) ]) }>
                <CountrySelect
                    value={ country }
                    onChange={ (value: CountryCode | '') => setCountry(value) }
                    className={ classes.countrySelector }
                />
                <input
                    value={ getFormattedString() }
                    onChange={ (e) => onChangeLocal(e.currentTarget.value) }
                    onInput={ (e) => onInputLocal(e) }
                    onPaste={ (e) => onPastLocal(e) }
                    maxLength={ 14 }
                    className={ classes.inputPhone }
                />
                {/* error={ value ? (isValidPhoneNumber(value) ? undefined : 'Invalid phone number') : 'Phone number required' } */ }

            </Flex>
        </Input.Wrapper>
    );

};

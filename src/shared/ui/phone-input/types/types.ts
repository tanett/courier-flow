import React from 'react';

export type typePhoneInputWithMoskito = {
    formGetInputProps: {value: any, onChange: any, checked?: any, error?: any, onFocus?: any, onBlur?: any},
    value: string,
    onInput: (e: React.FormEvent<HTMLInputElement>)=> void
    withAsterisk?: boolean
}

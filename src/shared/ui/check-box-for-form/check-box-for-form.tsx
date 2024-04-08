import React from 'react';
import { type CheckboxProps } from '@mantine/core/lib/Checkbox/Checkbox';
import { Checkbox, Text } from '@mantine/core';
import { CheckIcon, MinusIcon } from '@heroicons/react/24/outline';

const CheckboxIcon: React.FC<{
    indeterminate: boolean;
    className: string;
}> = ({ indeterminate, className }) => indeterminate ? <MinusIcon className={className} /> : <CheckIcon strokeWidth={'2.5'} className={className} />;

export const CheckBoxForForm: React.FC<CheckboxProps & {generallabel: string}> = (props, context) => {

    return (
        <>
            <Text mb={10} fw={500}>{props.generallabel}</Text>
            <Checkbox
                size={'md'}
                { ...props }
                mb={12}
                icon={CheckboxIcon}
            />
        </>
    );

};

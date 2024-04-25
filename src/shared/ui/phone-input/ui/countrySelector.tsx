import React, { forwardRef } from 'react';
import { Box, Group, Select, Text } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { t } from '@lingui/macro';
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    label: string;
    value: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({
        label,
        value,
        ...others
    }: ItemProps, ref) => (
        <Box ref={ ref } { ...others } px={ 5 }>
            <Group noWrap px={ 0 }>
                <Text size="md">{ label }</Text>
                <Text size="sm" opacity={ 0.65 }>
                    { value }
                </Text>
            </Group>
        </Box>
    )
);

type typeCountrySelect = {
    value: string,
    onChange: (event: any) => void
    className: string | undefined
}
export const CountrySelect: React.FC<typeCountrySelect> = ({
    value,
    onChange,
    className,
    ...rest
}) => {

    const data = getCountries()
        .map(item => ({
            value: item,
            label: '+ ' + getCountryCallingCode((item)),
        }))
        .sort((a, b) => a.label > b.label ? 1 : -1);

    return (
        <Select
            placeholder="Country code"
            itemComponent={ SelectItem }
            data={ [ {
                value: '',
                label: t`country code`,
            }, ...data ] }
            value={ value }
            onChange={ onChange }
            maxDropdownHeight={ 400 }
            rightSection={ <IconChevronDown size="1rem"/> }
            rightSectionWidth={ 30 }
            styles={ {
                rightSection: {
                    pointerEvents: 'none',
                    pointer: 'pointer',
                },
            } }
            sx={ {
                '&.mantine-Select-root div[aria-expanded=true] .mantine-Select-rightSection': { transform: 'rotate(180deg)' },
                '&.mantine-Select-root  input': { paddingRight: '25px' },
            } }
            { ...rest }
            className={ className }
        />);

};

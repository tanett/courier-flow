import React from 'react';
import { Select } from '@mantine/core';
import { Stands } from 'features/select-stand/types';

export const SelectStand: React.FC = () => {


    return (
        <Select
            data={[
                { value: Stands.DEV, label: Stands.DEV },
                { value: Stands.TEST, label: Stands.TEST }
            ]}
            defaultValue={localStorage.getItem('stand') ?? Stands.DEV}
            label={'Select stand'}
            onChange={(value) => {

                localStorage.setItem('stand', value);

            }}
        />
    );

};

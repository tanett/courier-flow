import React from 'react';
import { Loader as MantineLoader } from '@mantine/core';
import { typeLoaderProps } from './types';

export const Loader: React.FC<typeLoaderProps> = ({ size = 'md' }) => {

    return (
        <MantineLoader size={size} />
    );

};

import { typeLabelProps } from './types';
import { Flex } from '@mantine/core';
import React from 'react';

export const Label: React.FC<typeLabelProps> = ({ children }) => {

    return (
        <Flex>{children}</Flex>
    );

};

import React from 'react';
import { Box, Flex, useMantineTheme } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { typeSelectFile } from '../types/types';


export const SelectFile: React.FC<typeSelectFile> = ({setStep}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();




    return (
        <Flex direction="column" pb={ 8 } px={ 15 } mt={'-15px'}>
           select file

        </Flex>
    );

};

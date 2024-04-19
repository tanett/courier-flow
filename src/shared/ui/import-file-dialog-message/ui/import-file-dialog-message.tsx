import React from 'react';
import { typeImportFileDialogMessageProps } from '../types/types';
import { Box, Flex } from '@mantine/core';
import { useStyles } from './styles';
import cn from 'classnames';

export const ImportFileDialogMessage: React.FC<typeImportFileDialogMessageProps> = ({ title, children, isWide }) => {

    const { classes } = useStyles();

    return (
        <Flex className={cn(classes.messageContainerWrapper, { [ classes[ 'wideVariant' ] ]: isWide })}>
            <Flex className={classes.contentWrapper}>
                <Box className={classes.contentTitle}>{title}</Box>
                {children}
            </Flex>
        </Flex>
    );

};

import { Box, Flex } from '@mantine/core';
import React from 'react';
import { useStyles } from './styles';
import { typeModalHeaderProps } from './types';
import { CloseButton } from '../modal-close-button/modal-close-button';

const Header: React.FC<typeModalHeaderProps> = ({ title, onClose }) => {

    const { classes } = useStyles();

    return (
        <Flex className={classes.header}>
            <Box className={classes.title}>{title}</Box>
            {!!onClose && <Box className={classes.buttonContainer}><CloseButton onClick={onClose}/></Box>}
        </Flex>
    );

};

export { Header };

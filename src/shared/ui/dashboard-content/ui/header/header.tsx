import React from 'react';
import { Box, Flex } from '@mantine/core';
import { useStyles } from './styles';
import { typeHeaderProps } from '../../types/types';

export const Header: React.FC<typeHeaderProps> = ({ leftSide, rightSide }) => {

    const { classes } = useStyles();

    return (
        <Flex className={classes.headerContainer}>
            {leftSide && <Box className={classes.leftSide}>{leftSide}</Box>}
            {rightSide && <Flex className={classes.rightSide}>
                <Box>
                    {rightSide}
                </Box>
            </Flex>}

        </Flex>
    );

};

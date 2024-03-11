import React from 'react';
import { Box, Flex, useMantineTheme } from '@mantine/core';
import { useStyles } from './styles';


export const InfoCardSmall: React.FC<{label: string, content: React.ReactNode, iconLabel?: JSX.Element, withBottomBorder?: boolean}> = ({ label, content, iconLabel, withBottomBorder = true }) => {

    const { classes } = useStyles();
    const theme = useMantineTheme();
    return (
        <Flex
            className={classes.container}
            sx={{ borderBottom: `1px solid ${withBottomBorder ? theme.colors.borderColor[ 0 ] : 'transparent' }` }}
        >
            <Flex className={classes.label}>{iconLabel && iconLabel}{label}</Flex>
            <Box className={classes.content}>{content}</Box>
        </Flex>
    );

};

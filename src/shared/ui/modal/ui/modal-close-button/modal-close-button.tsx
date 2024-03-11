import { ActionIcon, useMantineTheme } from '@mantine/core';
import React from 'react';
import { useStyles } from './styles';
import { IconX } from '@tabler/icons-react';
import { typeModelCloseButtonProps } from './types';

export const CloseButton: React.FC<typeModelCloseButtonProps> = ({ onClick }) => {

    const theme = useMantineTheme();

    const { classes } = useStyles();

    return (
        <ActionIcon variant="outline" onClick={onClick} className={classes.closeButton} color={theme.colors.primary[ 5 ]}>
            <IconX className={classes.icon}/>
        </ActionIcon>
    );

};

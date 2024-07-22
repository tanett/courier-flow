import React from 'react';
import { useStyles } from './styles';
import { Box } from '@mantine/core';
import { BlockData } from './block-data';
import { typeInfoPanelExtensions } from './types';

// eslint-disable-next-line react/prop-types
const InfoPanel: typeInfoPanelExtensions &React.FC<React.PropsWithChildren> = ({ children }) => {

    const { classes } = useStyles();

    return (
        <Box className={classes.wrapper}>
            {children}
        </Box>
    );

};

InfoPanel.BlockData = BlockData;

export { InfoPanel };

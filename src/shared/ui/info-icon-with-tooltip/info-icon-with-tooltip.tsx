import React from 'react';
import { typeInfoIconWithTooltip } from './type';
import { Box, Tooltip } from '@mantine/core';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { InformationCircleIcon as HoveredIcon } from '@heroicons/react/24/solid';
import { useStyles } from './styles';
import { useHover } from '@mantine/hooks';

const InfoIconWithTooltip:React.FC<typeInfoIconWithTooltip> = ({label}) => {

    const { classes } = useStyles();

    const { hovered, ref } = useHover();

    return (
        <Box className={classes.container} ref={ref}>

            <Tooltip label={ label }  multiline
                     width={350}
                     withArrow
                     withinPortal>
                {hovered?<HoveredIcon className={ classes.icon } /> : <InformationCircleIcon className={ classes.icon }/> }
            </Tooltip>
        </Box>
    )
};

export default InfoIconWithTooltip;

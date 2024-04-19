import React, { useEffect, useState } from 'react';
import { Box, Progress, Tooltip, useMantineTheme } from '@mantine/core';
import { useStyles } from './styles';
import { typeImportFileProgressbarProps } from '../types/types';
import { useInterval } from '@mantine/hooks';

// TODO: make responsive step
const RANGE_STEP = 7;

export const ImportFileProgressbar: React.FC<typeImportFileProgressbarProps> = ({ loaderRange }) => {

    const { classes } = useStyles();

    const theme = useMantineTheme();

    const [ processRange, setProcessRange ] = useState(0);
    const [ intervalCounter, setIntervalCounter ] = useState(0);

    const interval = useInterval(() => setIntervalCounter(prev => prev >= 100 ? 1 : prev + 1), 20);

    useEffect(() => {

        interval.start();
        return interval.stop;

    }, []);

    useEffect(() => {

        if (loaderRange > 0 && processRange < loaderRange && processRange < 100) {

            setProcessRange(prev => prev + RANGE_STEP > 100 ? 100 : prev + RANGE_STEP);

        }
        if (processRange >= 100)interval.stop();

    }, [ intervalCounter ]);


    return (
        <Box className={classes.progressWrapper}>
            <Progress value={loaderRange === 0 ? 100 : processRange} animate={loaderRange === 0} className={classes.progressBar} color={loaderRange === 0 ? theme.colors.gray[ 2 ] : theme.colors.primary[ 5 ]}/>
            <div className={classes.progressbarWrapper}>
                <Box className={classes.progressbarRanger} w={`${processRange}%`}>
                    <Tooltip
                        label={`${processRange}%`}
                        opened={true} withArrow
                        position="top"
                        arrowPosition="center"
                        color="blue"
                        offset={12}
                    >
                        <div className={classes.progressbarPointer}></div>
                    </Tooltip>
                </Box>
            </div>
        </Box>
    );

};

import React from 'react';
import { typeImportExportButtonProps } from '../types/types';
import { useStyles } from './styles';
import { Box, Tooltip, UnstyledButton } from '@mantine/core';
import cn from 'classnames';
import { ArrowDownTrayIcon, CheckIcon, QuestionMarkCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import { IconLoader2 } from '@tabler/icons-react';

export const ImportExportButton: React.FC<typeImportExportButtonProps> = ({ variant, handler, inProcessHandler }) => {

    const { classes } = useStyles();

    switch (variant) {

    case 'download' :
        return (
            <Tooltip
                label={i18n._(t`Download`)}
                withArrow
                openDelay={1500}
            >
                <UnstyledButton onClick={handler} className={cn(classes.justIcon, classes.successColor, classes.successHover, classes.button)}>
                    {inProcessHandler ? <IconLoader2 className={classes.loadingFileLinkIcon} stroke={3}/> : <ArrowDownTrayIcon className={classes.icon}/>}
                </UnstyledButton>
            </Tooltip>
        );

    case 'done' :
        return (
            <Tooltip
                label={i18n._(t`Done`)}
                withArrow
                openDelay={1000}
            >
                <Box className={cn(classes.justIcon, classes.doneColor, classes.doneHover)}>

                    <CheckIcon className={classes.icon}/>

                </Box>
            </Tooltip>
        );

    case 'error' :
        return (
            <Tooltip
                label={i18n._(t`Error`)}
                withArrow
                openDelay={1500}
            >
                <UnstyledButton onClick={handler} className={cn(classes.justIcon, classes.errorColor, classes.errorHover, classes.button)}>
                    <QuestionMarkCircleIcon className={classes.icon}/>
                </UnstyledButton>
            </Tooltip>
        );

    case 'cancelled' :
        return (
            <Tooltip
                label={i18n._(t`Canceled`)}
                withArrow
                openDelay={1000}
            >
                <Box className={cn(classes.justIcon, classes.errorColor, classes.errorHover)}>

                    <XCircleIcon className={classes.icon}/>

                </Box>
            </Tooltip>
        );

    default :
        return (
            <Box className={cn(classes.justIcon, classes.spin)}>
                <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.3"
                        d="M42 21C42 32.598 32.598 42 21 42C9.40202 42 0 32.598 0 21C0 9.40202 9.40202 0 21 0C32.598 0 42 9.40202 42 21ZM6.54816 21C6.54816 28.9815 13.0185 35.4518 21 35.4518C28.9815 35.4518 35.4518 28.9815 35.4518 21C35.4518 13.0185 28.9815 6.54816 21 6.54816C13.0185 6.54816 6.54816 13.0185 6.54816 21Z"
                        fill="#FBBF24"/>
                    <path
                        d="M38.7259 21C40.5341 21 42.0261 19.5254 41.7453 17.7391C41.4882 16.1036 41.038 14.5003 40.4015 12.9636C39.3461 10.4158 37.7993 8.10079 35.8492 6.15076C33.8992 4.20073 31.5842 2.65388 29.0364 1.59853C27.4997 0.96201 25.8964 0.511804 24.2609 0.254715C22.4746 -0.026065 21 1.46585 21 3.27408C21 5.0823 22.4841 6.51129 24.2462 6.91745C25.0247 7.09691 25.7889 7.34105 26.5305 7.64824C28.2839 8.37451 29.877 9.43902 31.219 10.781C32.561 12.123 33.6255 13.7161 34.3518 15.4695C34.659 16.2111 34.9031 16.9753 35.0826 17.7538C35.4887 19.5159 36.9177 21 38.7259 21Z"
                        fill="#FBBF24"/>
                </svg>

            </Box>
        );

    }

};

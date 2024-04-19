import React from 'react';
import { Box, Button, Flex } from '@mantine/core';
import { i18n } from '@lingui/core';
import { t, Trans } from '@lingui/macro';
import { useStyles } from './styles';
import { typeFileLoaderProps } from '../types/types';
import { ImportFileProgressbar } from '../../import-file-progressbar';

export const FileLoader: React.FC<typeFileLoaderProps> = ({ loaderRange, confirmButton }) => {

    const { classes } = useStyles();


    return (
        <Flex className={classes.loadingProcessWrapper}>

            <ImportFileProgressbar loaderRange={loaderRange}/>

            <Flex className={classes.progressContentWrapper}>
                <Box className={classes.progressTitle}>{i18n._(t`File is loading`)}</Box>
                <Box>
                    <Trans>
                        You can close this window and download the file later in the
                    </Trans>
                </Box>
                <span className={classes.titleSpan}>
                    <svg width="52" height="22" viewBox="0 0 52 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M47.5 9.5L50 12M50 12L47.5 14.5M50 12H38" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="0.25" y="0.25" width="21.5" height="21.5" rx="1.75" stroke="#6B7280" strokeWidth="0.5"/>
                        <path
                            d="M11 6.1875C10.8177 6.1875 10.6428 6.11507 10.5139 5.98614C10.3849 5.8572 10.3125 5.68234 10.3125 5.5C10.3125 5.31766 10.3849 5.1428 10.5139 5.01386C10.6428 4.88493 10.8177 4.8125 11 4.8125C11.1823 4.8125 11.3572 4.88493 11.4861 5.01386C11.6151 5.1428 11.6875 5.31766 11.6875 5.5C11.6875 5.68234 11.6151 5.8572 11.4861 5.98614C11.3572 6.11507 11.1823 6.1875 11 6.1875ZM11 11.6875C10.8177 11.6875 10.6428 11.6151 10.5139 11.4861C10.3849 11.3572 10.3125 11.1823 10.3125 11C10.3125 10.8177 10.3849 10.6428 10.5139 10.5139C10.6428 10.3849 10.8177 10.3125 11 10.3125C11.1823 10.3125 11.3572 10.3849 11.4861 10.5139C11.6151 10.6428 11.6875 10.8177 11.6875 11C11.6875 11.1823 11.6151 11.3572 11.4861 11.4861C11.3572 11.6151 11.1823 11.6875 11 11.6875ZM11 17.1875C10.8177 17.1875 10.6428 17.1151 10.5139 16.9861C10.3849 16.8572 10.3125 16.6823 10.3125 16.5C10.3125 16.3177 10.3849 16.1428 10.5139 16.0139C10.6428 15.8849 10.8177 15.8125 11 15.8125C11.1823 15.8125 11.3572 15.8849 11.4861 16.0139C11.6151 16.1428 11.6875 16.3177 11.6875 16.5C11.6875 16.6823 11.6151 16.8572 11.4861 16.9861C11.3572 17.1151 11.1823 17.1875 11 17.1875Z"
                            stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {i18n._(t`Export list`)}
                </span>
                <Box>
                    <Trans>
                        This feature can be useful if the export process takes a long time.
                    </Trans>
                </Box>
            </Flex>
            {confirmButton && <Flex className={classes.progressButtonsWrapper}>
                <Button disabled={confirmButton.disabled} onClick={confirmButton.handler}>{confirmButton?.title}</Button>
            </Flex>}

        </Flex>
    );

};

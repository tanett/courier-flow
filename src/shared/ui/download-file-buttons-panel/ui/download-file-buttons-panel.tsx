import React from 'react';
import { typeDownloadFileButtonsPanelProps } from '../types/types';
import { Button, Flex } from '@mantine/core';
import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import { useStyles } from './styles';

export const DownloadFileButtonsPanel: React.FC<typeDownloadFileButtonsPanelProps> = ({ isReadyToDownload, isFileLoading, fileId, onDownloadFile }) => {

    const { classes } = useStyles();

    return (
        <Flex className={classes.buttonPanelWrapper}>

            {isReadyToDownload && fileId
                ? <Button
                    onClick={() => onDownloadFile(fileId)}
                    loading={isFileLoading}
                >
                    {i18n._(t`Download`)}
                </Button>
                : <Button disabled={true} >
                    {i18n._(t`Download`)}
                </Button>
            }

        </Flex>
    );

};

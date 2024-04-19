import { Dropzone } from '@mantine/dropzone';
import { Flex } from '@mantine/core';
import { IconDownload, IconDownloadOff } from '@tabler/icons-react';
import cn from 'classnames';
import { Trans } from '@lingui/macro';
import React from 'react';
import { useStyles } from './styles';
import { typeDragDropFileUploadProps } from '../types/types';
import anyFileSrc from 'shared/images/file-cons/any-file-icon.svg';
import xlsFileSrc from 'shared/images/file-cons/xlsx-file-icon.svg';

export const DragDropFileUpload: React.FC<typeDragDropFileUploadProps> = ({ isLoading, dropZoneMessage, acceptedFileFormats, maxFileSize, attachedFile, onFileAttach, onFileAttachReject }) => {

    const { classes } = useStyles();

    let imageSrc = anyFileSrc;
    if (attachedFile?.name.endsWith('.xlsx') || attachedFile?.name.endsWith('.xls')) imageSrc = xlsFileSrc;

    return (
        <Dropzone
            loading={isLoading}
            onReject={onFileAttachReject}
            maxSize={maxFileSize}
            maxFiles={1}
            accept={acceptedFileFormats}
            onDrop={onFileAttach}
        >
            <Flex className={classes.draZoneWrapper}>

                <Dropzone.Idle>
                    {attachedFile
                        ? <img className={classes.attachedIcon} src={imageSrc} alt=""/>
                        : <IconDownload className={cn(classes.downloadIcon, classes.colorGreen)} stroke={1}/>
                    }
                </Dropzone.Idle>
                <Dropzone.Accept>
                    <IconDownload className={cn(classes.downloadIcon, classes.colorBlue)} stroke={1}/>
                </Dropzone.Accept>
                <Dropzone.Reject>
                    <IconDownloadOff className={cn(classes.downloadIcon, classes.colorRed)} stroke={1}/>
                </Dropzone.Reject>
                <div className={classes.dragZoneMessage}>
                    {attachedFile
                        ? <Flex className={classes.attachedFileMessageWrapper}>
                            <div className={classes.attachedFileNameColor}>{attachedFile.name}</div>
                            <div><Trans>Attach another file</Trans></div>
                        </Flex>
                        : dropZoneMessage
                    }
                </div>

            </Flex>

        </Dropzone>
    );

};

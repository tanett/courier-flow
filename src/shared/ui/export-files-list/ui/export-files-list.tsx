import React from 'react';
import { Box, Flex } from '@mantine/core';
import { useStyles } from './styles';
import { typeExportFilesListProps } from '../types/types';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { importExportDateFormatter } from '../../../utils/import-export-date-formatter';
import { ImportExportButton } from '../../import-export-button';
import { exportFileStatuses } from '../../../../entities/exports/api/types';


export const ExportFilesList: React.FC<typeExportFilesListProps> = ({ dataList, onDownloadFile, isDownloadingFile }) => {

    const { classes } = useStyles();

    const [ downloadId, setDownloadId ] = React.useState<string | null>(null);

    return (
        <Flex className={classes.wrapper}>
            {dataList?.map(item => {

                const date = importExportDateFormatter(item.createdAt);

                let icon: null | React.ReactElement;

                switch (item.status.code) {

                case exportFileStatuses.DONE :
                    icon = <ImportExportButton
                        variant="download"
                        handler={() => {

                            setDownloadId(item.id);
                            onDownloadFile({
                                id: item.id,
                                fileName: item.type.name
                            });

                        }}
                        inProcessHandler={isDownloadingFile && item.id === downloadId}
                    />;
                    break;

                    //

                default :
                    icon = <ImportExportButton variant="loader"/>;

                }

                return (
                    <Flex key={item.id} className={classes.fileItem}>
                        <Box className={classes.rowIconWrapper}>
                            <DocumentTextIcon className={classes.rowIcon}/>
                        </Box>
                        <Flex className={classes.rowContent}>
                            <Box>
                                <Box className={classes.fileName}>{item.type.name}</Box>
                                <Box className={classes.textGraySmall}>{date.date}, {date.time}</Box>
                            </Box>
                        </Flex>
                        <Flex className={classes.rowButtonWrapper}>
                            {icon}
                        </Flex>
                    </Flex>
                );

            })}
        </Flex>
    );

};

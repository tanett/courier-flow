import React from 'react';
import { Box, Flex } from '@mantine/core';
import { useStyles } from './styles';
import { typeImportFilesListProps } from '../types/types';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { importExportDateFormatter } from '../../../utils/import-export-date-formatter';
import { ImportExportButton } from '../../import-export-button';
import { importFileStatuses } from '../../../../entities/imports/api/types';


export const ImportFilesList: React.FC<typeImportFilesListProps> = ({ dataList, setErrorList }) => {

    const { classes } = useStyles();

    return (
        <Flex className={classes.wrapper}>
            {dataList?.map(item => {

                const date = importExportDateFormatter(item.createdAt);

                let icon: null | React.ReactElement;

                switch (item.status.code) {

                case importFileStatuses.DONE :
                    icon = <ImportExportButton
                        variant="done"
                    />;
                    break;

                case importFileStatuses.ERROR :
                    icon = <ImportExportButton
                        variant="error"
                        handler={() => setErrorList(item.errors)}
                    />;
                    break;

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
                                {item.fileName && <Box className={classes.importFileName}>{item.fileName}</Box>}
                            </Box>
                            <Box className={classes.textGraySmall}>{date.date}, {date.time}</Box>
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

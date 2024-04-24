import React from 'react';
import { Box, Flex } from '@mantine/core';
import { typeImportFileDialogErrorListProps } from '../types/types';
import { useStyles } from './styles';
import { Trans } from '@lingui/macro';
import cn from 'classnames';


export const ImportFileDialogErrorList: React.FC<typeImportFileDialogErrorListProps> = ({ errorList, isSidePanel }) => {

    const { classes } = useStyles();

    return (
        <Flex className={classes.errorListWrapper}>
            {errorList.map((item, index) => <Flex key={index} className={classes.rowWrapper}>
                <Box className={classes.bigFont}>{index + 1}.</Box>
                <Flex className={cn(classes.contentWrapper, { [ classes.bigFont ]: isSidePanel })}>
                    <Box>{item.errorMessage}</Box>
                    {(item.rowNumber || item.invalidValue) && <Flex className={classes.bottomRow}>
                        {item.rowNumber && <Box className={classes.bottomRowDataBlock}>
                            <span className={classes.bottomRowTitle}><Trans>Line number</Trans>:</span> {item.rowNumber}
                        </Box>}
                        {item.invalidValue && <Box className={classes.bottomRowDataBlock}>
                            <span className={classes.bottomRowTitle}><Trans>Value</Trans>:</span> {typeof item.invalidValue === 'string' ? item.invalidValue : item.invalidValue.description}
                        </Box>}
                    </Flex>}
                </Flex>
            </Flex>)}
        </Flex>
    );

};

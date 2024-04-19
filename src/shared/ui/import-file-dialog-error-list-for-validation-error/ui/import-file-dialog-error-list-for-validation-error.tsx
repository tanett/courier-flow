
import React from 'react';
import { Box, Flex } from '@mantine/core';
import { typeImportFileDialogErrorListForValidationErrorProps } from '../types/types';
import { useStyles } from './styles';
import { Trans } from '@lingui/macro';
import cn from 'classnames';

export const ImportFileDialogErrorListForValidationError: React.FC<typeImportFileDialogErrorListForValidationErrorProps> = ({ errorList, isSidePanel }) => {

    const { classes } = useStyles();

    return (
        <Flex className={classes.errorListWrapper}>
            {errorList.map((item, index) => <Flex key={index} className={classes.rowWrapper}>
                <Box>{index + 1}.</Box>
                <Flex className={cn(classes.contentWrapper, { [ classes.bigFont ]: isSidePanel })}>
                    <Box>{item.errorMessage}</Box>
                    {(item.fieldName || item.invalidValue) && <Flex className={classes.bottomRow}>
                        {item.fieldName }
                        {item.invalidValue && <Box className={classes.bottomRowDataBlock}>
                            <span className={classes.bottomRowTitle}><Trans>Value</Trans>:</span> {item.invalidValue.description}
                        </Box>}
                    </Flex>}
                </Flex>
            </Flex>)}
        </Flex>
    );

};

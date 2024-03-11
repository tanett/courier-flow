import React from 'react';
import { Button, Flex } from '@mantine/core';
import { Trans } from '@lingui/macro';
import { useStyles } from './styles';
import { typeFilterButtonsBar } from '../types/types';

export const FilterButtonsBar: React.FC<typeFilterButtonsBar> = ({ onReset }) => {

    const { classes } = useStyles();

    return (
        <Flex className={classes.filterButtonsContainer}>
            {onReset && <Button variant="outline" onClick={onReset}>
                <Trans>Reset</Trans>
            </Button>}
            <Button type="submit">
                <Trans>Apply</Trans>
            </Button>
        </Flex>
    );

};

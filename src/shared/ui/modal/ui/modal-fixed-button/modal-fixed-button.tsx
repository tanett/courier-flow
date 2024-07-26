import { ActionIcon, Box, UnstyledButton, Text, Flex, rem, Button } from '@mantine/core';
import React from 'react';
import { useStyles } from './styles';
import { typeModalFixedButton } from './types';
import { Trans } from '@lingui/macro';

export const ModalFixedButton: React.FC< typeModalFixedButton> = ({ onClick,onClose, label, icon }) => {

    const { classes } = useStyles();

    return (
        <Box className={classes.positionedContainer} w={'100%'}>
            <Flex sx={ {
                alignItems: 'center',
                gap: rem(24),
                justifyContent: 'center',
            } }>
                {onClose && <Button variant="outline" onClick={ onClose } className={classes.button}><Trans>Close</Trans></Button> }
                <Button onClick={ onClick } className={classes.button}><Trans>Print</Trans></Button>
            </Flex>

        </Box>

    );

};

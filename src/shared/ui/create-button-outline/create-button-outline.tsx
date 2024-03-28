import React from 'react';
import { typeCreateButtonOutline } from './types';
import { IconPlus } from '@tabler/icons-react';
import { Trans } from '@lingui/macro';
import { Button, useMantineTheme } from '@mantine/core';


export const CreateButtonOutline: React.FC<typeCreateButtonOutline> = ({ id, handler }) => {

    const theme = useMantineTheme();

    return (
        <Button
            id={id}
            key={ id }
            variant={'outline'}
            sx={ {
                fontWeight: 700,
                fontSize: theme.fontSizes.md,
                letterSpacing: '0.3px',
                '&:hover': { backgroundColor: theme.colors.primary[ 0 ] },
            } }
            onClick={ handler }
            leftIcon={ <IconPlus size={ 20 }/> }><Trans>Create</Trans>
        </Button>
    );

};

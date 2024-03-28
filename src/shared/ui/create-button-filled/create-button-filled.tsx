import React from 'react';
import { typeCreateButtonFilled } from './types';
import { IconPlus } from '@tabler/icons-react';
import { Trans } from '@lingui/macro';
import { Button, useMantineTheme } from '@mantine/core';

export const CreateButtonFilled: React.FC<typeCreateButtonFilled> = ({ id, handler }) => {

    const theme = useMantineTheme();

    return (
        <Button
            id={id}
            key={ id }
            sx={ {
                backgroundColor: theme.colors.primary[ 5 ],
                fontWeight: 700,
                fontSize: theme.fontSizes.md,
                letterSpacing: 0.3,
                '&:hover': { backgroundColor: theme.colors.primary[ 6 ] },
            } }
            onClick={ handler }
            leftIcon={ <IconPlus size={ 20 }/> }><Trans>Create</Trans>
        </Button>
    );

};

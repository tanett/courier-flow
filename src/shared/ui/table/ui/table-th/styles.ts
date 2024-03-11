import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    thContent: {
        display: 'flex',
        alignItems: 'center',
    },
    leftDivider: { borderLeft: `1px solid ${theme.colors.borderColor[ 0 ]}` },
    alignCenter: { justifyContent: 'center' },
    alignRight: { justifyContent: 'end' },
}));

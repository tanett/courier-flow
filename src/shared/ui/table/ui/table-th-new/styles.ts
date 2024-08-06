import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    thContent: {
        display: 'flex',
        alignItems: 'center',
        height: rem(36),
        textAlign: 'left',
    },
    leftDivider: { borderLeft: `1px solid ${theme.colors.borderColor[ 0 ]}` },
    alignCenter: { justifyContent: 'center' },
    alignRight: { justifyContent: 'end' },
}));

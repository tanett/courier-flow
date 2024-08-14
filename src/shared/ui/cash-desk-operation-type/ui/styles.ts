import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
        gap: rem(6),
        alignItems: 'center',
    },
    icon: {
        width: rem(16),
        height: rem(16),
        fill: theme.colors.gray[ 5 ],
    },
}));

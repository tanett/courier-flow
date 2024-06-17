import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    icon: {
        width: rem(24),
        height: rem(24),
        color: theme.colors.yellow[4],
        backgroundColor: theme.white,
        borderRadius: '50%',
    },
    container: {
        flexGrow: 1,
        flexShrink: 0
    }
}))

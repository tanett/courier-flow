import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    wrapper: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        gap: rem(16),
    },
    icon: {
        marginTop: rem(140),
        width: rem(86),
        height: rem(86),
    },
    text: {
        fontSize: rem(20),
        color: theme.colors.gray[ 5 ],
        fontWeight: 500,
    },
}));

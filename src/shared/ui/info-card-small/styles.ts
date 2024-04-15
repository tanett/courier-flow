import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    container: {
        alignSelf: 'flex-start',
        minHeight: rem(80),
        flexDirection: 'column',
        paddingTop: rem(16),
        paddingBottom: rem(10),
    },
    label: {
        gap: rem(8),
        fontSize: theme.fontSizes.md,
        fontWeight: 600,
        lineHeight: rem(19),
        letterSpacing: rem(0.3),
        marginBottom: rem(12),
        alignItems: 'center',
        '& svg': {
            width: rem(24),
            height: rem(24),
            color: theme.colors.primary[ 5 ],
        },
    },
    content: {
        fontSize: theme.fontSizes.md,
        fontWeight: 400,
        lineHeight: rem(19),
        letterSpacing: rem(0.3),
        wordBreak: 'break-all',
    },
}));

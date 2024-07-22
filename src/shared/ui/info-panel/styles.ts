import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    wrapper: {
        boxSizing: 'border-box',
        border: `1px solid ${ theme.colors.borderColor[ 0 ] }`,
        borderRadius: rem(8),
        padding: `${rem(30)} ${rem(16)}`,
        backgroundColor: theme.white,
        maxWidth: rem(1122),
    },
    blockDataWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: rem(8),
    },
    blockDataLabelWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: rem(8),
        fontSize: theme.fontSizes.md,
        fontWeight: 600,
        lineHeight: rem(19),
        letterSpacing: rem(0.3),
        wordBreak: 'break-all',
    },
    labelIcon: {
        width: rem(24),
        height: rem(24),
        color: theme.colors.primary[ 5 ],
    },
    blockDataContentWrapper: { wordBreak: 'break-all' },
    withUnderline: {
        borderBottom: `1px solid ${theme.colors.borderColor[ 0 ]}`,
        paddingBottom: rem(12),
    },
}));

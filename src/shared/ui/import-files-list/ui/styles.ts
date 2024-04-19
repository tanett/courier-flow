import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        flexDirection: 'column',
        gap: rem(16),
        height: '100%',
        width: '100%',
    },
    fileItem: {
        gap: rem(16),
        alignItems: 'center',
    },
    rowIconWrapper: {
        width: rem(24),
        height: rem(24),
        flexShrink: 0,
        alignSelf: 'start',
    },
    rowIcon: {
        marginTop: rem(4),
        width: rem(24),
        height: rem(24),
        color: theme.colors.primary[ 5 ],
    },
    rowContent: {
        flexGrow: 1,
        flexDirection: 'column',
        gap: rem(6),
    },
    fileName: {
        fontWeight: 500,
        '&:first-letter': { textTransform: 'capitalize' },
    },
    importFileName: {
        color: theme.colors.gray[ 5 ],
        fontSize: rem(14),
        lineHeight: rem(14),
    },
    textGraySmall: {
        color: theme.colors.gray[ 5 ],
        fontSize: rem(14),
    },
    textGray: { color: theme.colors.gray[ 5 ] },
    rowButtonWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: rem(42),
        height: rem(42),
        flexShrink: 0,
    },
}));

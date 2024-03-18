import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    breadCrumbsWrapper: {
        gap: `${rem(12)} ${rem(8)}`,
        alignItems: 'center',
        flexWrap: 'wrap',
        color: theme.colors.gray[ 5 ],
    },
    item: {
        color: theme.colors.gray[ 5 ],
        textDecoration: 'none',
        paddingBottom: '0',
        marginBottom: rem(-2),
        wordBreak: 'break-all',
    },
    link: {
        '&:hover': {
            textDecoration: 'underline',
            textDecorationThickness: rem(1),
            textUnderlineOffset: rem(2),
        },
    },
    activeItem: {
        fontSize: rem(20),
        color: theme.colors.primary[ 5 ],
        fontWeight: 500,
        paddingBottom: '0',
        marginBottom: rem(-2),
    },
    separatorIcon: {
        width: rem(16),
        height: rem(16),
    },
}));

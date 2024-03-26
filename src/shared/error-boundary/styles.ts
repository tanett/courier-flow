import { createStyles, rem } from '@mantine/core';


export const useStyles = createStyles((theme) => ({
    container: {
        minHeight: rem(300),
        display: 'flex',
        gap: rem(36),
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: rem(36),
        border: `1px solid ${theme.colors.gray[ 3 ]}`,
        borderRadius: rem(4),
        backgroundColor: theme.colors.primary[ 1 ],
    },
    title: {
        fontSize: theme.fontSizes.lg,
        fontWeight: 'bold',
        color: theme.colors.gray[ 7 ],
        padding: rem(18),
        margin: 0,
    },
    errorIcon: { color: theme.colors.primary[ 6 ] },
}));

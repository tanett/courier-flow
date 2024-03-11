import { createStyles, rem } from '@mantine/core';


export const useStyles = createStyles((theme) => ({
    button: {
        fontWeight: 700,
        fontSize: theme.fontSizes.md,
        letterSpacing: '0.3px',
        '&:hover': { backgroundColor: theme.colors.primary[ 0 ] },
        '& svg': { color: theme.primaryColor, width: rem(20), height: rem(20), stroke: '1.5' },
    },
    actionIcon: {
        width: rem(20),
        height: rem(20),
        color: theme.colors.primary[ 7 ],
    },
    flexColumn: {
        flexDirection: 'column',
        gap: theme.spacing.xl,
    },
    buttonsBar: {
        gap: theme.spacing.sm,
        marginTop: theme.spacing.md,
        justifyContent: 'end',
    },
    messageFlex: {
        gap: theme.spacing.xl,
        alignItems: 'center',
    },
    popupIcon: {
        width: rem(70),
        height: rem(70),
        color: theme.colors.red[ 7 ],
    },
    messageText: {
        color: theme.colors.red[ 7 ],
        fontWeight: 'bold',
    },
}));

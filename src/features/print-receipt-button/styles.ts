import { createStyles, rem } from '@mantine/core';


export const useStyles = createStyles((theme) => ({
    button: {
       width:'36px',
        height: '36px',
        borderColor: 'transparent',
        '&:hover': {
           '& svg':{ color: theme.colors.primary[6], },
            backgroundColor: theme.colors.gray[ 1 ],
           //  borderColor: theme.colors.gray[5],
        },

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

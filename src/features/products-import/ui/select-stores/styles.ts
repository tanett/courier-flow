import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    container: {
        flexDirection: 'column',
        paddingBottom: '8px',
        paddingLeft: '15px',
        paddingRight: '15px',
    },
    error: {
        color: theme.colors.red[ 5 ],
        fontSize: theme.fontSizes.sm,
        marginTop: '5px',
    },
    btnPanel: {
        display: 'flex',
        flexDirection: 'row',
        gap: '24px',
        justifyContent: 'center',
    },
    button: {
        fontWeight: 700,
        fontSize: theme.fontSizes.md,
        letterSpacing: 0.3,
        '& .mantine-Button-leftIcon': {
            width: '24px',
            height: '24px',
            color: theme.colors.primary[ 5 ],
        },
    },
}));

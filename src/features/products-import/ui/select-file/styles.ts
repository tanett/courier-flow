import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    container: {
        flexDirection: 'column',
        paddingBottom: '8px',
        paddingLeft: '15px',
        paddingRight: '15px',
        minWidth: '45vw',
    },
    alert: {
        color: theme.colors.primary[ 5 ],
        '& .mantine-Alert-icon': {
            width: '24px',
            height: '24px',
        },
        '& .mantine-Alert-message': {
            fontSize: theme.fontSizes.md,
            letterSpacing: 0.3,
            color: theme.colors.gray[ 5 ],
            '& b': { color: theme.colors.gray[ 8 ], fontWeight: 500 },
        },
    },
    alertWrapper: {
        marginTop: rem(16),
        color: theme.colors.red[ 5 ],
        width: rem(516),
        boxSizing: 'border-box',

        '& .mantine-Alert-icon': {
            width: rem(24),
            height: rem(24),
        },
    },
    alertMessage: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        color: theme.colors.red[ 5 ],

        '& div': { textAlign: 'left' },
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

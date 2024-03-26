import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    label: {
        fontWeight: 500,
        marginBottom: rem(2),
    },
    wrapper: {
        width: '100%',
        alignItems: 'center',
        gap: rem(18),
        maxWidth: rem(546),
    },
    button: {
        flexGrow: 1,
        backgroundColor: 'transparent',
        border: `1px solid ${theme.colors.borderColor[ 0 ]}`,
        boxSizing: 'border-box',
        padding: rem(10),
        borderRadius: rem(4),
        cursor: 'pointer',

        '&:focus': {
            outline: 'none',
            boxShadow: `0 0 0 2px #fff, 0 0 0 4px ${theme.colors.primary[ 5 ]}`,
        },

        '&:active': { transform: 'translateY(1px)', boxShadow: 'none' },
    },
    active: {
        borderColor: theme.colors.primary[ 5 ],
        color: theme.colors.primary[ 5 ],
        backgroundColor: theme.fn.rgba(theme.colors.primary[ 5 ], 0.2),
    },
}));

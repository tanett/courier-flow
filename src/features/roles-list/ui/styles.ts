import { createStyles, rem } from '@mantine/core';


export const useStyles = createStyles((theme) => ({
    noWrap: { whiteSpace: 'nowrap' },

    popupDescription: {
        '& .mantine-Modal-overlay': { background: theme.fn.rgba(theme.colors.gray[ 3 ], 0.4) },
        '& .mantine-Modal-content': {
            padding: `${rem(33)} ${rem(16)} ${rem(30)} ${rem(16)}`,
            marginTop: `calc(133px - 5dvh)`,
            position: 'relative',
            borderRadius: rem(8),
            background: theme.white,
            boxShadow: `0px 6px 15px 0px rgba(50, 43, 43, 0.10)`,
            width: rem(631),
        },
        '& .mantine-Modal-header': {
            paddingLeft: rem(14),
            paddingRight: rem(14),
            paddingBottom: rem(25),
            borderBottom: `1px solid ${theme.colors.borderColor[ 0 ]}`,
            '& .mantine-Modal-title': {
                fontSize: rem(20),
                fontWeight: 600,
                letterSpacing: 0.3,
                color: theme.colors.primary[ 5 ],
            },
        },

    },
    closeButton: {
        boxSizing: 'border-box',
        minWidth: rem(42),
        minHeight: rem(42),
        width: rem(42),
        height: rem(42),
        border: `1px solid ${theme.colors.primary[ 5 ]}`,
        borderRadius: rem(8),
        color: theme.colors.primary[ 5 ],
        position: 'absolute',
        right: rem(30),
        top: rem(20),
        zIndex: 1000,
    },
    contentWrapper: {
        paddingLeft: rem(14),
        paddingRight: rem(14),
        fontSize: theme.fontSizes.md,
        letterSpacing: '0.3px',
        marginTop: rem(24),
    },
}));

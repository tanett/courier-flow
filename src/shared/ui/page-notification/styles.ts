import { createStyles, rem } from '@mantine/core';


export const useStyles = createStyles((theme) => ({
    container: {
        position: 'fixed',
        right: rem(20),
        top: rem(20),
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        gap: rem(14),
        width: rem(483),
    },
    animateBox: {
        overflow: 'hidden',
        boxShadow: '0px 6px 15px 0px rgba(50, 43, 43, 0.10)',
        borderRadius: rem(8),
        width: '100%',
    },
    mainContainer: {
        background: theme.white,
        border: `1px solid ${theme.colors.gray[ 2 ]}`,
        boxSizing: 'border-box',
        borderRadius: rem(8),
        padding: `${rem(16)} ${rem(18)}`,
        gap: rem(12),
        overflow: 'hidden',
        height: '100%',
        width: '100%',
    },
    messageWrapper: {
        flexGrow: 1,
        alignItems: 'center',
        height: rem(42),
    },
    message: {
        display: '-webkit-box',
        textOverflow: 'ellipsis',
        maxHeight: rem(42),
        lineHeight: '130%',
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',
        '-webkit-line-clamp': '2',
    },
    closeButton: {
        alignSelf: 'center',
        width: rem(26),
        height: rem(26),
        backgroundColor: theme.colors.gray[ 0 ],
        '&:hover': { backgroundColor: theme.colors.primary[ 0 ] },
    },
    closeIcon: {
        width: rem(18),
        height: rem(18),
        color: theme.colors.primary[ 5 ],
    },
    iconWrapper: {
        alignSelf: 'center',
        width: rem(36),
        height: rem(36),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        flexShrink: 0,
    },
    icon: {
        width: rem(24),
        height: rem(24),
    },
    info: {
        backgroundColor: theme.colors.primary[ 1 ],
        color: theme.colors.primary[ 5 ],
    },
    error: {
        backgroundColor: theme.colors.red[ 1 ],
        color: theme.colors.red[ 6 ],
    },
    warning: {
        backgroundColor: theme.colors.yellow[ 1 ],
        color: theme.colors.yellow[ 7 ],
    },
    success: {
        backgroundColor: theme.colors.green[ 1 ],
        color: theme.colors.green[ 6 ],
    },
    closed: { height: 0 },

}));

import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    wrapper: {
        alignItems: 'stretch',
        gap: rem(16),
    },
    buttonIcon: {
        width: rem(20),
        height: rem(20),
    },
    menuButtonIcon: {
        width: rem(20),
        height: rem(20),
    },
    colorPrimary5:{color: theme.colors.primary[5]},
    draZoneWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: rem(10),
        minWidth: rem(480),
        minHeight: rem(140),
        padding: rem(10),
        boxSizing: 'border-box',
    },
    downloadIcon: {
        width: rem(42),
        height: rem(42),

    },
    colorGreen: { color: theme.colors.green[ 5 ] },
    colorRed: { color: theme.colors.red[ 5 ] },
    colorBlue: { color: theme.colors.primary[ 5 ] },
    dragZoneMessage: { fontSize: rem(16) },
    attachedIcon: {
        width: rem(42),
        height: rem(42),
    },
    attachedFileMessageWrapper: {
        flexDirection: 'column',
        gap: rem(16),
        color: theme.colors.primary[ 5 ],
    },
    attachedFileNameColor: {
        color: theme.colors.green[ 5 ],
        fontWeight: 500,
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
    templateLink: {
        display: 'flex',
        alignItems: 'center',
        fontSize: rem(14),
        gap: rem(4),
        alignSelf: 'end',
        transform: 'translateY(-14px)',
        color: theme.colors.primary[ 5 ],
        textDecoration: 'none',

        '&:hover': { textDecoration: 'underline' },
    },
    loadingFileLinkIcon: {
        height: rem(16),
        width: rem(16),
        animation: 'spin 1s linear infinite',
        '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
        },
    },
}));

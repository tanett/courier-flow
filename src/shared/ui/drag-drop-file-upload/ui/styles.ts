import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
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
        wordBreak: 'break-all'
    },
}));

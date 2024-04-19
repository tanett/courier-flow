import { createStyles, rem } from '@mantine/core';


export const useStyles = createStyles((theme) => ({
    loadingProcessWrapper: {
        width: rem(516),
        boxSizing: 'border-box',
        flexDirection: 'column',
        gap: rem(24),
    },
    progressWrapper: { padding: `0 ${rem(24)}` },
    progressContentWrapper: {
        flexDirection: 'column',
        gap: rem(2),
        fontSize: rem(16),
    },
    progressBar: { marginTop: rem(40) },
    progressTitle: {
        textAlign: 'center',
        fontSize: rem(20),
        fontWeight: 500,
    },
    titleSpan: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: rem(12),
        fontSize: rem(18),
    },
    progressButtonsWrapper: {
        display: 'flex',
        justifyContent: 'center',
        gap: rem(24),
        paddingBottom: rem(4),

        '& .mantine-Button-root': {
            fontSize: rem(16),
            fontWeight: 500,
        },
    },
    progressbarWrapper: {
        position: 'relative',
        '& .mantine-Tooltip-tooltip ': {
            backgroundColor: theme.colors.primary[ 5 ],
            color: 'whitesmoke',
            padding: `${rem(2)} ${rem(8)}`,
        },
    },
    progressbarRanger: {
        position: 'absolute',
        height: 0,
        width: 0,
    },
    progressbarPointer: {
        position: 'absolute',
        width: 1,
        height: 1,
        right: 0,
    },
}));

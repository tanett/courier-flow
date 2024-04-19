import { createStyles, rem } from '@mantine/core';


export const useStyles = createStyles((theme) => ({
    progressWrapper: { padding: `0 ${rem(24)}` },
    progressBar: { marginTop: rem(40) },
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

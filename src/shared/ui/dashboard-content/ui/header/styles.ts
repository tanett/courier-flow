import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    headerContainer: {
        gap: rem(30),
        alignItems: 'center',
    },
    leftSide: {
        alignSelf: 'start',
        borderBottom: `1px solid ${theme.colors.gray[ 2 ]}`,
        paddingBottom: rem(8),
    },
    rightSide: {
        justifyContent: 'end',
        alignItems: 'center',
        flexGrow: 1,
    },

}));

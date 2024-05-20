import { createStyles, rem } from '@mantine/core';


export const useStyles = createStyles((theme) => ({
    time: {
        fontSize: rem(14),
        fontWeight: 400,
        color: theme.colors.gray[5],
    },
    buttonPanelWrapper: {
        alignItems: 'center',
        gap: rem(24),
        justifyContent: 'center'
    }
}));

import { createStyles, rem } from '@mantine/core';


export const useStyles = createStyles((theme) => ({
    grayTextSize12: {
        fontSize: rem(12),
        fontWeight: 400,
        color: theme.colors.gray[5],
    },
    buttonPanelWrapper: {
        alignItems: 'center',
        gap: rem(24),
        justifyContent: 'center'
    }
}));

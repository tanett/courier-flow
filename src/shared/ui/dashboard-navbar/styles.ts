import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    navbarContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme.white,
        border: 'none',
        maxHeight: '100px'
    },
}));

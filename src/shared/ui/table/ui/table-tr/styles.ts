import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    tableRow: { '&:nth-of-type(odd)': { backgroundColor: theme.colors.gray[ 0 ] } },
    hoverRow: {
        cursor: 'pointer',
        '&:hover': { backgroundColor: theme.colors.primary[ 2 ] },
    },
}));

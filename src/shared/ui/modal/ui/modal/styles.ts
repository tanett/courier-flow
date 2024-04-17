import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    popup: { '& .mantine-Modal-body': { padding: `${rem(24)} ${rem(16)}` } },
    content: {
        flexDirection: 'column',
        position: 'relative',
        padding: rem(16),
        paddingRight: rem(16),
    },
    auto: { width: 'auto' },
    dialog: { width: rem(504) },
    roleDetails: { width: rem(630) },
    '70%': { width: '70%' },
}));

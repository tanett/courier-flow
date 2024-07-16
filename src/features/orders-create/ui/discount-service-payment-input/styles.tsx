import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({

        inputWrapper: { },
        inputButtons: {
            width: '93px',
            gap: 0,
            height: '95%',
            borderRadius: rem(4),
            overflow: 'hidden',
            borderLeft: `1px solid ${theme.colors.gray[1]}`,
        },
        inputTypeButton:{
            boxSizing: 'border-box',
            width: rem(46),
            border: 'none',
            backgroundColor: theme.colors.gray[0],
            padding: rem(6),
            fontWeight: 500,
            color: theme.black,
            cursor: 'pointer',

        },
        inputTypeButtonSelected:{
            color: theme.white,
            backgroundColor: theme.colors.primary[5],

        }
})
)

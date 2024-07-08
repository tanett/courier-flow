import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    positionedContainer: {
       position: 'absolute',
        bottom: '10%',
      //  right: '48%',
        zIndex:999,
        [`@media print`]: {  display: 'none', },

    },
    button: { boxShadow: `0px 10px 27px 14px ${theme.white}`  }
}));

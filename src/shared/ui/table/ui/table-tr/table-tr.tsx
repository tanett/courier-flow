import React from 'react';
import { typeTableTrProps } from './types';
import cn from 'classnames';
import { useStyles } from './styles';

export const Tr: React.FC<typeTableTrProps> = ({ children, handler }) => {

    const { classes } = useStyles();

    return (
        <tr
            className={cn(classes.tableRow, { [ classes.hoverRow ]: !!handler })}
            onClick={(event) => {

                event.stopPropagation();
                if (handler) handler();

            }
            }
        >
            {children}
        </tr>
    );

};

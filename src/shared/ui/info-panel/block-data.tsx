import React from 'react';
import { typeBlockDataProps } from './types';
import cn from 'classnames';
import { useStyles } from './styles';

export const BlockData: React.FC<typeBlockDataProps> = ({ icon, label, children, withUnderline, className }) => {

    const { classes } = useStyles();

    return (
        <div className={cn({ [ `${className}` ]: !!className }, classes.blockDataWrapper, { [ classes.withUnderline ]: withUnderline })}>
            <div className={classes.blockDataLabelWrapper}>{icon && <div className={classes.labelIcon}>{icon}</div>}{label}</div>
            <div className={classes.blockDataContentWrapper}>{children}</div>
        </div>
    );

};

import React from 'react';
import { Loader } from '../loader/loader';
import { useStyles } from './styles';

export const LoaderAria: React.FC = () => {

    const { classes } = useStyles();

    return (
        <div className={classes.overlay}>
            <Loader/>
        </div>
    );

};

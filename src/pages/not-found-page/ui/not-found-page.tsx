import React from 'react';
import { useStyles } from './styles';
import { NotFound } from '../../../shared/ui/not-found/not-found';

const NotFoundPage: React.FC = () => {

    const { classes } = useStyles();

    return (
        <div className={classes.overlay}>
            <NotFound/>
        </div>
    );

};

export default NotFoundPage;

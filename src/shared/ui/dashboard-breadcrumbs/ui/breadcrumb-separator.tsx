import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { useStyles } from './styles';

export const BreadcrumbSeparator: React.FC = () => {

    const { classes } = useStyles();

    return (
        <ChevronRightIcon className={classes.separatorIcon}/>
    );

};

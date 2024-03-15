import { Link } from 'react-router-dom';
import React from 'react';
import { typeBreadcrumbsItemProps } from '../types/types';
import { Box } from '@mantine/core';
import { useStyles } from './styles';

export const BreadcrumbItem: React.FC<typeBreadcrumbsItemProps> = ({ name, path, isActive }) => {

    const { classes } = useStyles();

    return (
        path
            ? <Link to={path} className={`${classes.item} ${classes.link}`} >{name}</Link>
            : <Box className={isActive ? classes.activeItem : ''} sx={{wordBreak: 'break-all'}}>{name}</Box>
    );

};

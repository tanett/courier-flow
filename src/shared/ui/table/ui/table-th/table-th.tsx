import React from 'react';
import { useStyles } from './styles';
import { Flex } from '@mantine/core';
import cn from 'classnames';
import { typeTableTh } from '../../types/type';

export const TableTh: React.FC<typeTableTh> = ({ children, withLeftDivider, align }) => {

    const { classes } = useStyles();

    return (
        <th>
            <Flex className={cn(classes.thContent, {
                [ classes.leftDivider ]: withLeftDivider,
                [ classes.alignCenter ]: align === 'center',
                [ classes.alignRight ]: align === 'right',
            })}>
                {children}
            </Flex>
        </th>
    );

};

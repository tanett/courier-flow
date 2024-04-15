import React from 'react';
import { useStyles } from './styles';
import { Flex } from '@mantine/core';
import cn from 'classnames';
import { typeTableThProps } from './types';

export const Th: React.FC<typeTableThProps> = ({ children, withoutLeftDivider, align, colSpan }) => {

    const { classes } = useStyles();

    return (
        <th colSpan={colSpan}>
            <Flex className={cn(classes.thContent, {
                [ classes.leftDivider ]: !withoutLeftDivider,
                [ classes.alignCenter ]: align === 'center',
                [ classes.alignRight ]: align === 'right',
            })}>
                {children}
            </Flex>
        </th>
    );

};

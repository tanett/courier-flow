import React from 'react';
import { useStyles } from './styles';
import { Flex } from '@mantine/core';
import { typeTableTd } from '../../types/type';
import cn from 'classnames';

export const Td: React.FC<typeTableTd> = ({ children, align, additionalClasses }) => {

    const { classes } = useStyles();

    return (
        <td className={additionalClasses}>
            <Flex className={cn(classes.tdContent, {
                [ classes.alignCenter ]: align === 'center',
                [ classes.alignRight ]: align === 'right',
            })}>
                {children}
            </Flex>
        </td>
    );

};

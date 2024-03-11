import React from 'react';
import { Box, Flex } from '@mantine/core';
import { useStyles } from './styles';
import { Header } from '../table-header/table-header';
import { typeTableExtensions, typeTableProps } from './types';
import { Th } from '../table-th-new/table-th';
import { Body } from '../table-body/table-body';
import { Td } from '../table-td-new/table-td';
import { Tr } from '../table-tr/table-tr';
import { TdActions } from '../table-actions/table-actions';
import { EmptyRow } from '../table-empty-row/table-empty-row';
import cn from 'classnames';

// eslint-disable-next-line react/prop-types
const Table: typeTableExtensions & React.FC<typeTableProps> = ({ children, variant }) => {

    const { classes } = useStyles();

    return (
        <Flex className={classes.tableWrapper}>
            <Box className={cn(classes.tableBorder, { [ classes.inTab ]: variant === 'inTab' })}>
                <table>
                    {children}
                </table>
            </Box>
        </Flex>
    );

};

Table.Header = Header;
Table.Th = Th;
Table.Body = Body;
Table.Tr = Tr;
Table.Td = Td;
Table.TdActions = TdActions;
Table.EmptyRow = EmptyRow;

export { Table };

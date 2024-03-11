import { Body } from '../table-body/table-body';
import { Header } from '../table-header/table-header';
import { Th } from '../table-th-new/table-th';
import { Td } from '../table-td-new/table-td';
import { Tr } from '../table-tr/table-tr';
import { TdActions } from '../table-actions/table-actions';
import { EmptyRow } from '../table-empty-row/table-empty-row';
import React from 'react';

export type typeTableExtensions = {
    Header: typeof Header;
    Th: typeof Th
    Body: typeof Body
    Tr: typeof Tr
    Td: typeof Td
    TdActions: typeof TdActions
    EmptyRow: typeof EmptyRow
}

export interface typeTableProps extends React.PropsWithChildren{
    variant?: 'inTab'
}

import { typeTableEmptyRow } from './types';
import React from 'react';
import { Alert } from '@mantine/core';

export const EmptyRow: React.FC<typeTableEmptyRow> = ({ columnCount, children }) => {

    return (
        <tr className="empty">
            <td colSpan={columnCount}>
                <div>
                    <Alert color="blue">
                        {children}
                    </Alert>
                </div>
            </td>
        </tr>
    );

};

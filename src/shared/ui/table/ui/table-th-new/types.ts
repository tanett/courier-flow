import React from 'react';

export interface typeTableThProps extends React.PropsWithChildren {
    withoutLeftDivider?: boolean,
    align?: 'center' | 'right'
    colSpan?: number
}

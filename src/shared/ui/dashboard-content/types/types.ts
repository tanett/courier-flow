import React from 'react';

export interface typeHeaderProps {
    leftSide?: React.ReactElement | React.ReactNode
    rightSide?: React.ReactElement | React.ReactNode
}

export interface typeDashboardContentExtensions {
    Header: React.FC<typeHeaderProps>
}

export type typeDashboardContent = {
    withForm?: boolean
}

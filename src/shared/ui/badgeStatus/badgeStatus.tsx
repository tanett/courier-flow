import React from 'react';
import { typeBadgeStatus } from 'shared/ui/badgeStatus/types';
import { Badge } from '@mantine/core';
import { useStyles } from './styles';

const BadgeStatus:React.FC<typeBadgeStatus> = ({ label, type }) => {

    const { classes } = useStyles();

    return (
        <Badge variant={'outline'} className={classes.badge} color={type === 'error' ? 'red.5' : 'green.5'} size={'md'} radius={'xs'}
            bg={type === 'error' ? 'red.0' : 'green.0'}>{ label}</Badge>
    );

};

export default BadgeStatus;

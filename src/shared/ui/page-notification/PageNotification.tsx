import { Box } from '@mantine/core';
import React from 'react';
import { useSelectorT } from '../../../app/state';
import { Notification } from './Notification';
import { useStyles } from './styles';


export const PageNotification: React.FC = () => {

    const { classes } = useStyles();

    const notificationList = useSelectorT(state => state.notifications.notificationList);

    return (
        <Box className={ classes.container }>
            {notificationList.map(notification => <Notification
                key={notification.id}
                id = {notification.id}
                message={notification.message}
                type={notification.type}
            />)}
        </Box>
    );

};

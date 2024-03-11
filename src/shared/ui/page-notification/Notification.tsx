import { ActionIcon, Box, Flex } from '@mantine/core';
import { IconCheck, IconExclamationMark, IconX } from '@tabler/icons-react';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatchT } from '../../../app/state';
import { notificationActions } from '../../../entities/notification/model';
import { NOTIFICATION_EXPIRED_TIME, NOTIFICATION_TYPES } from './constants';
import { useStyles } from './styles';
import { typeNotification } from './types';


export const Notification: React.FC<typeNotification> = ({ id, type, message }) => {

    const { classes } = useStyles();

    const dispatchApp = useAppDispatchT();

    const notificationRef = useRef<HTMLDivElement | null>(null);

    let typeStyles = classes.info;
    if (type === NOTIFICATION_TYPES.ERROR) {

        typeStyles = classes.error;

    } else if (type === NOTIFICATION_TYPES.WARNING) {

        typeStyles = classes.warning;

    } else if (type === NOTIFICATION_TYPES.SUCCESS) {

        typeStyles = classes.success;

    }

    useEffect(() => {

        const timer = setTimeout(() => {

            dispatchApp(notificationActions.removeNotification(id));
            clearTimeout(timer);

        }, NOTIFICATION_EXPIRED_TIME);
        return () => {

            clearTimeout(timer);

        };

    }, []);

    const [ notificationHeight, setNotificationHeight ] = useState(0);

    useEffect(() => {

        if (notificationRef.current && notificationRef.current.scrollHeight) {

            setNotificationHeight(notificationRef.current.scrollHeight);
            const timer = setTimeout(() => {

                setNotificationHeight(0);
                clearTimeout(timer);

            }, NOTIFICATION_EXPIRED_TIME - 400);

        }

    }, [ notificationRef ]);


    return (
        <Box className={ classes.animateBox } style={{ height: notificationHeight ? notificationHeight : 0, transition: 'height .2s ease-in' }}>
            <Flex ref={notificationRef} className={ classes.mainContainer }>
                <div className={`${classes.iconWrapper} ${typeStyles}`}>
                    {type === NOTIFICATION_TYPES.INFO && <Box sx={{ fontSize: '24px', fontWeight: 'bold' }}>i</Box>}
                    {type === NOTIFICATION_TYPES.ERROR && <IconX stroke={3} className={classes.icon}/>}
                    {type === NOTIFICATION_TYPES.WARNING && <IconExclamationMark stroke={3} className={classes.icon}/>}
                    {type === NOTIFICATION_TYPES.SUCCESS && <IconCheck stroke={3} className={classes.icon}/>}
                </div>
                <Flex className={classes.messageWrapper}>
                    <Box className={ classes.message }>{ message }</Box>
                </Flex>
                <ActionIcon variant="transparent" onClick={() => setNotificationHeight(0)} className={classes.closeButton}>
                    <IconX className={ classes.closeIcon } />
                </ActionIcon>
            </Flex>
        </Box>
    );

};

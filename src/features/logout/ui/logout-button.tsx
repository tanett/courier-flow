import { Trans } from '@lingui/macro';
import { Text, UnstyledButton } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './styles';
import { useAppDispatchT } from 'app/state';
import { typeLogoutButton } from '../types/types';
import { authStateActions } from '../../../entities-project/auth/model/state-slice';
import { routerPaths } from 'app/config/router-paths';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';


export const LogoutButton: React.FC<typeLogoutButton> = ({ text }) => {

    const { classes } = useStyles();

    const dispatchApp = useAppDispatchT();

    const navigate = useNavigate();

    const onLogout = () => {

        dispatchApp(authStateActions.changeAuth(false));

        navigate(routerPaths.login, { replace: true });

    };

    return (
        <UnstyledButton
            className={classes.button}
            onClick={onLogout}
            data-testid="logout-button"
        >
            <ArrowRightEndOnRectangleIcon className={classes.icon}/>
            <Text data-testid="logout-user" className={classes.text}>
                { text ? text : <Trans>Logout</Trans> }
            </Text>
        </UnstyledButton>
    );

};

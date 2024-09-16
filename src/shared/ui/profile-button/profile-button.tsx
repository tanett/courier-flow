import React from 'react';
import { Trans } from '@lingui/macro';
import { typeProfileButtonProps } from './types';
import { useStyles } from './styles';
import { NavLink, useLocation } from 'react-router-dom';
import { Box } from '@mantine/core';
import { UserCircleIcon as UserCircleIconOutline } from '@heroicons/react/24/outline';
import { UserCircleIcon as UserCircleIconSolid } from '@heroicons/react/24/solid';
import { useSelectorT } from 'app/state';

export const ProfileButton: React.FC<typeProfileButtonProps> = ({ link }) => {

    const { classes } = useStyles();

    const userName = useSelectorT(state => state.userProfile.userProfile?.actor.fullName);

    const location = useLocation();

    const containsString = location.pathname.includes(link);

    return (
        <NavLink
            to={link}
            className={classes.link}
        >
            <Box className={classes.iconWrapper}>
                {containsString
                    ? <UserCircleIconSolid className={classes.icon}/>
                    : <UserCircleIconOutline className={classes.icon}/>
                }
            </Box>
            <span>
                { userName ?? '-------' }
            </span>
        </NavLink>
    );

};

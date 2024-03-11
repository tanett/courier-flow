import React from 'react';
import { Center, Text } from '@mantine/core';
import { Trans } from '@lingui/macro';
import { Link } from 'react-router-dom';
import { useStyles } from './styles';


export const SupportLink: React.FC = () => {

    const { classes } = useStyles();

    const supportEmail = process.env.REACT_APP_SUPPORT_EMAIL ? `mailto:${process.env.REACT_APP_SUPPORT_EMAIL}` : undefined;

    const onSupportLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {

        if (supportEmail) {

            window.location.href = supportEmail;

        }
        e.preventDefault();

    };

    return (
        <Center>
            {supportEmail &&
                <Text className={classes.text}>
                    <Trans>Have questions?</Trans>  <Link to="#" onClick={(e) => onSupportLinkClick(e)} className={classes.link}>{<Trans>Contact Support</Trans>}</Link>.
                </Text>
            }
        </Center>
    );

};

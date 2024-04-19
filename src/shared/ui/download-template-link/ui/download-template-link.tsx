import React from 'react';
import { IconLoader2 } from '@tabler/icons-react';
import { Trans } from '@lingui/macro';
import { UnstyledButton } from '@mantine/core';
import { useStyles } from './styles';
import { typeDownloadTemplateLinkProps } from '../types/types';

export const DownloadTemplateLink: React.FC<typeDownloadTemplateLinkProps> = ({ isLoading, onClick }) => {

    const { classes } = useStyles();

    return (
        <UnstyledButton className={classes.templateLink} onClick={onClick}>
            {isLoading && <IconLoader2 className={classes.loadingFileLinkIcon} stroke={3}/>}
            <span><Trans>Download a file template</Trans></span>
        </UnstyledButton>
    );

};

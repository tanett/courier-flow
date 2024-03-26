import React from 'react';
import { IconFaceIdError } from '@tabler/icons-react';
import { useStyles } from './styles';
import { t } from '@lingui/macro';

function FallbackError() {

    const { classes } = useStyles();
    return (
        <div className={ classes.container }>
            <IconFaceIdError className={ classes.errorIcon } size={40} stroke={1.5}/>
            <p className={ classes.title }>{ t`Something went wrong...` }</p>
        </div>
    );

}

export default FallbackError;

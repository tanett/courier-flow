import React from 'react';
import { typeButtonAsLink } from './types';
import { Button, Text } from '@mantine/core';
import { useStyles } from './styles';

const ButtonAsLink:React.FC<typeButtonAsLink> = ({onClick, label, id, disabled}) => {

    const {classes} = useStyles()

    return (
        <Button id={id} variant={ 'subtle' } disabled={disabled} className={ classes.btnLink } onClick={ onClick }><Text >{label}</Text></Button>
    );
};

export default ButtonAsLink;

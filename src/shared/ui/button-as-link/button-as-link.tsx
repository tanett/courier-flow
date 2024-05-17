import React from 'react';
import { typeButtonAsLink } from './types';
import { Button } from '@mantine/core';
import { useStyles } from './styles';

const ButtonAsLink:React.FC<typeButtonAsLink> = ({onClick, label, id}) => {

    const {classes} = useStyles()

    return (
        <Button id={id} variant={ 'subtle' } className={ classes.btnLink } onClick={ onClick }>{label}</Button>
    );
};

export default ButtonAsLink;

import React from 'react';
import { useStyles } from './styles';
import { Title } from '@mantine/core';
import { iFieldsetForForm } from 'shared/ui/fieldset-for-form/types/types';


export const FieldsetForForm: React.FC<iFieldsetForForm> = ({
    title,
    children,
}) => {

    const { classes } = useStyles();

    return (

        <fieldset className={ classes.fieldset }>
            <Title order={ 3 }>{ title }</Title>
            { children }
        </fieldset>


    );

};

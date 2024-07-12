import React from 'react';
import { useStyles } from './styles';
import { type UseFormReturnType } from '@mantine/form';
import { typeOrdersForm } from '../types/types';
import { Flex, SimpleGrid, TextInput, Textarea, Grid } from '@mantine/core';
import { Trans } from '@lingui/macro';
import { FieldsetForForm } from 'shared/ui/fieldset-for-form';

import { PhoneInputWithCountrySelector } from 'shared/ui/phone-input';
import { SelectorWithSearchStore } from 'features/selector-with-search-store';
import { typeReturnForm } from 'features/selector-with-search-store/types';



export const OrderProducts: React.FC<{ form:  UseFormReturnType<typeOrdersForm, (values: typeOrdersForm) => typeOrdersForm> }> = ({ form, }) => {


    const { classes } = useStyles();

    return (
      <fieldset className={classes.fieldset} >

            <Flex className={ classes.flexColumn }>

                <SelectorWithSearchStore required={true} fieldName={'storeId'} form={form as unknown as typeReturnForm} initialValue={null}/>

                <Grid gutter={ 12} >
                    <Grid.Col span={5} sx={{minWidth: '418px'}}>1</Grid.Col>
                    <Grid.Col span={'auto'}  sx={{minWidth: '672px'}}>2</Grid.Col>
                </Grid>

            </Flex>

        </fieldset>
    );

};

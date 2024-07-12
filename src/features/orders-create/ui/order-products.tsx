import React from 'react';
import { useStyles } from './styles';
import { typeReturnOrderForm } from '../types/types';
import { Box, Flex, Grid } from '@mantine/core';
import { SelectorWithSearchStore } from 'features/selector-with-search-store';
import { typeReturnForm } from 'features/selector-with-search-store/types';
import { SelectorProducts } from 'features/orders-create/ui/selector-products/selector-products';



export const OrderProducts: React.FC<{ form:  typeReturnOrderForm }> = ({ form, }) => {


    const { classes } = useStyles();


    return (
      <fieldset className={classes.fieldset} >

            <Flex className={ classes.flexColumn }>

                <SelectorWithSearchStore required={true} fieldName={'storeId'} form={form as unknown as typeReturnForm} initialValue={null}/>

                <Grid gutter={ 12} >
                    <Grid.Col span={5} sx={{minWidth: '418px'}}>
                        <SelectorProducts form={form}/>
                    </Grid.Col>
                    <Grid.Col span={'auto'}  sx={{minWidth: '672px'}}>
                        <Flex direction="column" justify="space-between" sx={{height: '100%'}}>
                            table
                           <Box className={classes.discountContainer}>
22
                           </Box>
                        </Flex>
                    </Grid.Col>
                </Grid>

            </Flex>

        </fieldset>
    );

};

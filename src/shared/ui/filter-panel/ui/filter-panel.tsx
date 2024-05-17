import { Box, Flex } from '@mantine/core';
import React from 'react';
import { useStyles } from './styles';
import { typeFilterPanel } from '../types/types';
import { FilterBlock } from './filter-block';
import { FindBlock } from './find-block';

export const FilterPanel: React.FC<typeFilterPanel> = ({ filterComponent, withFind }) => {

    const { classes } = useStyles();

    return (
        <Flex className={classes.wrapper}>
            <Box className={classes.findWrapper}>
                {withFind && <FindBlock
                    placeholder={typeof withFind === 'object' ? withFind.placeholder : undefined}
                    minValueLength={typeof withFind === 'object' ? withFind.minValueLength : undefined}
                />}
            </Box>
            {filterComponent && <Box>
                <FilterBlock filterComponent={filterComponent}/>
            </Box>}
        </Flex>
    );

};

import React from 'react';
import { typeAddAndSelectCategoriesForTerminals } from 'features/terminal-configurations-create/ui/select-categories-for-terminal/types';
import { SimpleGrid } from '@mantine/core';
import ListAttachedCategory from 'features/terminal-configurations-create/ui/select-categories-for-terminal/ui/list-attached-category';

import { SelectorProductCategory } from 'features/terminal-configurations-create/ui/select-categories-for-terminal/ui/selector-product-category/selector-product-category';

const SelectCategoriesForTerminals: React.FC<typeAddAndSelectCategoriesForTerminals> = ({ form}) => {

    return (
        <SimpleGrid
            sx={{gap:0}}
            breakpoints={ [
                {
                    minWidth: 'md',
                    cols: 1,
                    spacing: 0,
                },
                {
                    minWidth: 1200,
                    cols: 2,
                    spacing: 0,
                }
            ] }
        >
             <SelectorProductCategory form={ form } />
            <ListAttachedCategory form={ form } />
        </SimpleGrid>
    );
};

export default SelectCategoriesForTerminals;

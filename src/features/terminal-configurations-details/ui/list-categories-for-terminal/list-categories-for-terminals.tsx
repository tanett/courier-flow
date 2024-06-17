import React, { useState } from 'react';
import { ListCategoriesForConfigurationTerminals } from 'features/terminal-configurations-details/ui/list-categories-for-terminal/ui/list-categories-for-configuration-terminals';
import { typeTerminalConfigurations } from '../../../../entities/terminals-configurations/model/state-slice';
import { Flex } from '@mantine/core';
import { typeCategoryExtended } from 'entities/category/model/types';
import ListProductsInCategory from 'features/terminal-configurations-details/ui/list-categories-for-terminal/ui/list-products-in-category';

const ListCategoriesForTerminals: React.FC<{ data: typeTerminalConfigurations }> = ({ data }) => {

    const [ selectedItem, setSelectedItem ] = useState<typeCategoryExtended | null>(null);

    return (
        <Flex >
            { data && <>
                <ListCategoriesForConfigurationTerminals data={ data } selectedItem={ selectedItem } setSelectedItem={ setSelectedItem }/>
                { selectedItem && <ListProductsInCategory categoryId={ selectedItem.id }/> }
            </> }
        </Flex>
    );
};

export default ListCategoriesForTerminals;

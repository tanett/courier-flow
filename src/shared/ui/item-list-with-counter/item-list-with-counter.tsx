import React from 'react';
import { typeItemListWithCounter } from './types';
import { Box, Flex, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';

const ItemListWithCounter: React.FC<typeItemListWithCounter> = ({
    numberVisibleItem,
    list
}) => {

    const theme = useMantineTheme();

    const visibleArray = list.length > numberVisibleItem
        ? list.slice(0, numberVisibleItem)
        : list;

    return (
        <Flex  gap={ 5 } wrap={ 'nowrap' } w={'100%'}>
            <Box w={ '100%' } sx={{flexGrow: 1}}>{ visibleArray.map((store, index) =>
                <Text key={ store.id } truncate={ true } sx={ {
                    maxWidth: 222,
                    width: '100%',
                    wordBreak: 'break-all',
                    borderBottom: index !== visibleArray.length - 1 ? `1px solid ${ theme.colors.gray[2] }` : undefined
                } }>{ store.name }</Text>) }
            </Box>
            { list.length > numberVisibleItem && <Tooltip color={'white'} sx={{color: theme.black}} label={i18n._(t`Click to view full list`)}><Box sx={ {
                alignSelf: 'flex-end',
                color: theme.colors.gray[5]
            } }>+&nbsp;{ list.length - numberVisibleItem }</Box></Tooltip> }
        </Flex>

    );
};

export default ItemListWithCounter;

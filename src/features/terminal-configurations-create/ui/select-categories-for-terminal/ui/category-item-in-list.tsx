import React from 'react';
import { ActionIcon, Box, Flex, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { t } from '@lingui/macro';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useLingui } from '@lingui/react';
import { typeProductCategoryChecked } from 'features/terminal-configurations-create/types/types';

const CategoryItemInList: React.FC<{ item: typeProductCategoryChecked,
    index: number,
    onDeleteCategoryClick: (index: number) => void,
}> = ({
    item,
    index,
    onDeleteCategoryClick
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    return (
        <Flex
            key={ index }
            sx={{
                padding: '8px',
                gap: '10px',
                position: 'relative',
                '& .mantine-Text-root': { width: '90%' },
                 backgroundColor: theme.colors.primary[0],
                '& .editButtonBlock': { display: 'none',  },
                '&:hover .editButtonBlock': { display: 'flex',  }
            }}>
            <Text truncate>{ item.name }</Text>
            <Flex className={ 'editButtonBlock' }  py={0} >
                <Box px={ 8 }  h={24}>
                    <Tooltip withArrow arrowSize={ 6 } radius="md" label={ i18n._(t`Delete`) }>
                        <ActionIcon variant="subtle" onClick={ (e) => {
                            e.stopPropagation();
                            onDeleteCategoryClick(index);
                        } }>
                            <XMarkIcon color={ theme.colors.gray[5] } width={ 24 } height={ 24 } />
                        </ActionIcon>
                    </Tooltip>
                </Box>
            </Flex>
        </Flex>
    );
};

export default CategoryItemInList;

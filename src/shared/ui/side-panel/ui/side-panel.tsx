import { ActionIcon, Drawer, Flex, ScrollArea, useMantineTheme } from '@mantine/core';
import React from 'react';
import { typeSidePanelProps } from '../types/types';
import { useStyles } from './styles';
import { IconX } from '@tabler/icons-react';

export const SidePanel: React.FC<typeSidePanelProps> = ({ isOpened, onClose, title, size = 'md', children }) => {

    const { classes } = useStyles();

    const theme = useMantineTheme();

    return (
        <Drawer
            position="right"
            size={size === 'sm' ? '25rem' : '38.125rem'}
            opened={isOpened}
            onClose={onClose}
            withCloseButton={false}
            overlayProps={{ opacity: 0.5, bg: '#D1D5DB70' }}
            padding={0}
        >
            <ScrollArea type="auto">
                <Flex className={classes.drawerContainer}>
                    <Flex className={classes.drawerHeader}>
                        <div className={classes.drawerTitle}>
                            {title}
                        </div>
                        <ActionIcon onClick={onClose} variant="transparent" size="2.625rem" radius="md" color={ theme.colors.gray[ 5 ]}>
                            <IconX size="1.85rem" stroke={1.5} color={ theme.colors.gray[ 5 ]} />
                        </ActionIcon>
                    </Flex>
                    <Flex className={classes.drawerContentWrapper}>
                        {children}
                    </Flex>
                </Flex>
            </ScrollArea>
        </Drawer>
    );

};

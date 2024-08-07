import { Table } from '../table-new/table';
import React from 'react';
import { typeTableActionsProps } from './types';
import { ActionIcon, Box, Divider, Flex, Menu, Tooltip, useMantineTheme } from '@mantine/core';
import { useStyles } from './styles';
import cn from 'classnames';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';


export const TdActions: React.FC<typeTableActionsProps> = ({
    actions,
    visibleCount,
    align,
    dividerIndex,
    additionalClasses,
}) => {

    const { classes } = useStyles();

    const theme = useMantineTheme();

    const itemsCount = visibleCount && visibleCount > 1 && actions.length > 2 ? visibleCount : 1;

    const isWithMenu = actions.length > itemsCount + 1;

    const visibleMenuArr = !isWithMenu ? actions : actions.slice(0, itemsCount);
    const dropdownMenuArr = isWithMenu ? actions.slice(itemsCount - actions.length) : [];

    return (
        <Table.Td additionalClasses={additionalClasses} align={ align }>
            <Flex className={ classes.actionsWrapper }>
                { visibleMenuArr.map((item, index) => {

                    return (
                        <Box key={ index } className={ cn(classes.icon, { [classes.divider]: index !== 0 }) }>
                            <Tooltip withArrow arrowSize={ 6 } radius="md" label={ item.label } disabled={item.disabled }>
                                <ActionIcon variant="subtle"
                                            disabled={ item.disabled }
                                            onClick={ (e) => {
                                                e.stopPropagation();
                                                item.handler();

                                            } }>
                                    { item.icon }
                                </ActionIcon>
                            </Tooltip>
                        </Box>
                    );

                })}
                {isWithMenu && <Box key="dots" className={cn(classes.icon, classes.divider)}>
                    <Menu trigger="hover" openDelay={100} closeDelay={400} position="bottom-end" offset={3}>
                        <Menu.Target>
                            <ActionIcon variant="subtle" onClick={ (e) => {e.stopPropagation(); return }}>
                                <EllipsisVerticalIcon color={ theme.colors.gray[5] } width={ 22 }/>
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>

                            {
                                dropdownMenuArr.map((item, index) => <React.Fragment key={ index }>
                                    { dividerIndex && index === dividerIndex && <Divider size={ 'xs' } color={ theme.colors.gray[2] }/> }
                                    <Menu.Item
                                        key={ index }
                                        className={ classes.menuItem }
                                        icon={ item.icon }
                                        disabled={ item.disabled }
                                        sx={ {
                                            color: item.textColor ? item.textColor : undefined,
                                            cursor: item.disabled ? 'not-allowed' : 'pointer',
                                        } }
                                        onClick={ (e) => {

                                            e.stopPropagation();
                                            item.handler();

                                        } }
                                    >
                                        { item.label }
                                    </Menu.Item>
                                </React.Fragment>)

                            }
                        </Menu.Dropdown>
                    </Menu>

                </Box> }

            </Flex>
        </Table.Td>
    );

};

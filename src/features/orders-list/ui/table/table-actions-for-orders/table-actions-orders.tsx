
import React from 'react';
import { typeTableActionsProps } from './types';
import { ActionIcon, Box, Divider, Flex, Menu, Tooltip, useMantineTheme } from '@mantine/core';
import { useStyles } from './styles';
import cn from 'classnames';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Table } from 'shared/ui/table/ui/table-new/table';


export const TdActionsOrders: React.FC<typeTableActionsProps> = ({
    actions,
    align,
    dividerIndex
}) => {

    const { classes } = useStyles();

    const theme = useMantineTheme();

    const isWithMenu = actions.length >  1;

    const dropdownMenuArr = isWithMenu ? actions.slice(1) : [];

    return (
        <Table.Td align={ align }>
            <Flex className={ classes.actionsWrapper }>

                        <Box key={ 0 } className={ cn(classes.icon,{ [classes.invisible]: actions[0].disabled  }) }>
                            <Tooltip withArrow arrowSize={ 6 } radius="md" label={ actions[0].label } disabled={actions[0].disabled }>
                                <ActionIcon variant="subtle"
                                            disabled={ actions[0].disabled }
                                            onClick={ (e) => {
                                                e.stopPropagation();
                                                actions[0].handler();

                                            } }>
                                    { actions[0].icon }
                                </ActionIcon>
                            </Tooltip>
                        </Box>

                {isWithMenu && <Box key="dots" className={cn(classes.icon, { [classes.divider]: !actions[0].disabled  })}>
                    <Menu trigger="click" openDelay={100} closeDelay={400} position="bottom-end" offset={3}>
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

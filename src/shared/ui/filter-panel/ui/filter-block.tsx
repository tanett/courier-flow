import { Trans } from '@lingui/macro';
import { ActionIcon, Button, Drawer, Flex, Indicator, useMantineTheme } from '@mantine/core';
import React, { createContext, useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { typeFilterBlock } from '../types/types';
import { useStyles } from './styles';
import { IconX } from '@tabler/icons-react';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { FunnelIcon as FunnelIconSolid } from '@heroicons/react/24/solid';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import cn from 'classnames';

export const DrawerContext = createContext<(undefined) | (() => void)>(undefined);

export const FilterBlock: React.FC<typeFilterBlock> = ({ filterComponent }) => {

    const { classes } = useStyles();
    const theme = useMantineTheme();
    const [ opened, {
        open,
        close,
    } ] = useDisclosure(false);

    const urlParams = useUrlParams();

    const [ isEmptyFilter, setIsEmptyFilter ] = useState<boolean>(false);

    useEffect(() => {

        if (urlParams.filtersString && urlParams.filtersString !== '') {
            setIsEmptyFilter(false);
        } else {setIsEmptyFilter(true);}

    }, [ urlParams.filtersString ]);

    return (
        <DrawerContext.Provider value={ close }>
            <Indicator inline disabled={isEmptyFilter} size={12} className={classes.filterMarker}>
            <Button onClick={ open } variant={ 'outline' }
                    className={ classes.filterOpenButton }
                    leftIcon={ isEmptyFilter? <FunnelIcon/> : <FunnelIconSolid/> }
            >
                <Trans>Filter</Trans>
            </Button>
            </Indicator>
            <Drawer
                position="right"
                size={ '38.125rem' }
                opened={ opened }
                onClose={ close }
                withCloseButton={ false }
                overlayProps={ {
                    opacity: 0.5,
                    bg: '#D1D5DB70',
                } }
                padding={ 0 }
            >
                <Flex className={ classes.filterDrawerContainer }>
                    <Flex className={ classes.filterDrawerHeader }>
                        <div className={ classes.filterDrawerTitle }>
                            <Trans>Filter</Trans>
                        </div>
                        <ActionIcon onClick={ close } variant="outline" size="2.625rem" radius="md" sx={ {
                            borderColor: 'transparent',
                            color: theme.colors.gray[5],
                        } }>
                            <IconX size="1.85rem" stroke={ 1.5 }/>
                        </ActionIcon>
                    </Flex>
                    <Flex className={ classes.filterContainer }>
                        { filterComponent }
                    </Flex>
                </Flex>
            </Drawer>
        </DrawerContext.Provider>
    );

};

import { t, Trans } from '@lingui/macro';
import { ActionIcon, Button, Drawer, Flex, Indicator, Tooltip, useMantineTheme } from '@mantine/core';
import React, { createContext, useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { typeFilterBlock } from '../types/types';
import { useStyles } from './styles';
import { IconReload, IconX } from '@tabler/icons-react';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { FunnelIcon as FunnelIconSolid } from '@heroicons/react/24/solid';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import cn from 'classnames';
import { i18n } from '@lingui/core';
import { queryParamsNames } from 'app/config/api-constants';

export const DrawerContext = createContext<(undefined) | (() => void)>(undefined);

export const FilterBlock: React.FC<typeFilterBlock> = ({ filterComponent,isListLoading }) => {

    const { classes } = useStyles();
    const theme = useMantineTheme();
    const [ opened, {
        open,
        close,
    } ] = useDisclosure(false);

    const urlParams = useUrlParams();

    const onReset = () => {

        urlParams.setSearchParams({
            [queryParamsNames.filtersString]: urlParams.filtersToUri({}),
            [queryParamsNames.pageNumber]: undefined,
        });
    };

    const [ isEmptyFilter, setIsEmptyFilter ] = useState<boolean>(false);

    useEffect(() => {

        if (urlParams.filtersString && urlParams.filtersString !== '') {
            setIsEmptyFilter(false);
        } else {setIsEmptyFilter(true);}

    }, [ urlParams.filtersString ]);

    return (
        <DrawerContext.Provider value={ close }>

            <Button onClick={ open } variant={ 'outline' }
                    loading={isListLoading}
                    className={ cn(classes.filterOpenButton, { [classes.buttonRightPadding]: !isEmptyFilter }) }
                    leftIcon={ isEmptyFilter ? <FunnelIcon/> : <FunnelIconSolid/> }
                    rightIcon={ isEmptyFilter ? undefined : <div ><Tooltip withArrow arrowSize={ 6 } radius="md" label={i18n._(t`Reset filters`)}>
                        <ActionIcon variant="subtle"
                                    component={'div'}
                                    disabled={ isEmptyFilter }
                                    className={classes.resetActiveIcon}
                                    onClick={ (e) => {
                                        e.stopPropagation();
                                        // item.handler();
                                        onReset()
                                    } }>
                            <IconReload/>
                        </ActionIcon>
                    </Tooltip>
                    </div> }
            >
                <Trans>Filter</Trans>
            </Button>

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

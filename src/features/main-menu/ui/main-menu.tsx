import React, { useEffect, useState } from 'react';

import { mainMenuConfig } from '../config/main-menu.config';
import { Flex } from '@mantine/core';
import { useStyles } from './styles';
import { MainMenuItem } from './main-menu-item';
import { MenuSkeleton } from './menu-skeleton';
import { useSelectorT } from 'app/state';
import { typeMainMenuItem } from 'features/main-menu/types/types';
import { menuCreator } from 'features/main-menu/helpers/menuCreator';

export const MainMenu: React.FC = () => {

    const { classes } = useStyles();

    const permissions = useSelectorT(state => state.userProfile.userProfile?.permissions);

    const [ mainMenu, setMainMenu ] = useState<typeMainMenuItem[]>([]);

    useEffect(() => {

        if (permissions) setMainMenu(menuCreator(mainMenuConfig, permissions));

    }, [ permissions ]);


    return (
        mainMenu.length === 0
            ? <MenuSkeleton/>
            : <Flex className={classes.menuWrapper}>
                { mainMenu.map(item => <MainMenuItem key={item.id} {...item}/>)}
            </Flex>
    );

};

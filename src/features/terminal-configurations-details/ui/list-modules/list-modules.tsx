import React from 'react';
import { typeListModules } from './types';
import { ListModulesForConfigurationTerminals } from 'features/terminal-configurations-details/ui/list-modules/ui/list-modules-for-configuration-terminals';
import { GridWrapper } from 'features/terminal-configurations-details/ui/grid-wrapper/grid-wrapper';

const ListModules: React.FC<typeListModules> = ({ data }) => {

    return (
        <GridWrapper>
            { data && <><ListModulesForConfigurationTerminals data={ data }/> </> }
        </GridWrapper>
    );
};

export default ListModules;

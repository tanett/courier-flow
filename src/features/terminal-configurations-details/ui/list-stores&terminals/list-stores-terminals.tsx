import React from 'react';
import { typeListStoresTerminals } from './types';
import { ListStoresForConfigurationTerminals } from 'features/terminal-configurations-details/ui/list-stores&terminals/ui/list-stores-for-configuration-terminals';
import { ListTerminalsForConfigurationTerminals } from 'features/terminal-configurations-details/ui/list-stores&terminals/ui/list-terminals-for-configuration-terminals';
import { GridWrapper } from 'features/terminal-configurations-details/ui/grid-wrapper/grid-wrapper';

const ListStoresTerminals: React.FC<typeListStoresTerminals> = ({ data }) => {

    return (
        <GridWrapper>
            { data && <><ListStoresForConfigurationTerminals data={ data }/>
                <ListTerminalsForConfigurationTerminals data={ data }/></>
            }
        </GridWrapper>

    );
};

export default ListStoresTerminals;

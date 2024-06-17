import React from 'react';
import { SelectorStoresForConfigurationTerminals } from 'features/terminal-configurations-create/ui/select-stores&terminals/selectors-stores-terminals/selector-stores-for-configuration-terminals';
import { Trans } from '@lingui/macro';
import { SimpleGrid } from '@mantine/core';
import { typeSelectStoresTerminals } from './types';
import { SelectorTerminalsForConfigurationTerminals } from 'features/terminal-configurations-create/ui/select-stores&terminals/selectors-stores-terminals/selector-terminals-for-configuration-terminals';

const SelectStoresTerminals: React.FC<typeSelectStoresTerminals> = ({ form }) => {

    return (
        <SimpleGrid
            p={ 12 }
            breakpoints={ [
                {
                    minWidth: 'md',
                    cols: 1,
                    spacing: 10,
                },
                {
                    minWidth: 1200,
                    cols: 2,
                    spacing: 30,
                }
            ] }
        >
            <SelectorStoresForConfigurationTerminals form={ form } label={ <Trans>Stores</Trans> }/>
            <SelectorTerminalsForConfigurationTerminals form={ form } label={ <Trans>Terminals</Trans> }
            />
        </SimpleGrid>
    );
};

export default SelectStoresTerminals;

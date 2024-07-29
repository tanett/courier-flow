import React from 'react';
import { typeModuleChecked, typeSelectModule } from 'features/terminal-configurations-create/ui/select-modules/types';
import { Flex } from '@mantine/core';
import CardModule from 'features/terminal-configurations-create/ui/select-modules/card-module';
import { Trans } from '@lingui/macro';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { useGetModulesList } from 'features/terminal-configurations-create/ui/select-modules/hooks/use-get-modules-list';

const SelectModules: React.FC<typeSelectModule> = ({ form }) => {

    const {
        data,
        isLoading,
    } = useGetModulesList();


    const onClickModuleHandler = (module: typeModuleChecked, index: number) => {
        if (module.checked) {
            const indexInForm = form.values.availableModules.findIndex(item => item === module.value);
            form.removeListItem('availableModules', indexInForm);
        } else {
            form.insertListItem('availableModules', module.value);
        }
    };

    return (
        <Flex sx={ {
            padding: '12px',
            position: 'relative',
            gap: '12px',
            minHeight: '490px',
            alignItems: 'start',
        } }>
            { data
                ? data.map((item, index) => {
                        const isInForm = form.values.availableModules.findIndex((itemCode, index) => itemCode === item.value);
                        return <CardModule
                            key={ index }
                            module={ {
                            ...item,
                            checked: isInForm >= 0
                        } } onClick={ (item) => onClickModuleHandler(item, index) }/>;
                    }
                )
                : <Trans>No data</Trans>
            }
            { isLoading && <LoaderOverlay/> }
        </Flex>
    );
};

export default SelectModules;

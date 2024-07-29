import React from 'react';
import { Box, Flex, useMantineTheme, Text, rem } from '@mantine/core';
import AvailableModuleConfigTerminalsIcon from 'features/terminal-configurations-create/ui/select-modules/available-module-config-terminals-icon/available-module-config-terminals-icon';
import { typeModuleChecked } from 'features/terminal-configurations-create/ui/select-modules/types';

const CardModule: React.FC<{ module:  typeModuleChecked , onClick: (module: typeModuleChecked)=>void}> = ({ module, onClick }) => {

    const theme = useMantineTheme();

    return (
        <Box
            onClick={ ()=>onClick(module) }
            sx={ {
                padding: '16px',
                border: `1px solid ${module.checked? theme.colors.primary[5] : theme.colors.borderColor[0] }`,
                borderRadius: '4px',
                width: '173px',
                color: module.checked? theme.colors.primary[5] : theme.black,
                // height: '196px',
                backgroundColor: module.checked?  theme.colors.primary[0] : 'transparent',
                '&:hover': { backgroundColor:theme.fn.rgba(theme.colors.primary[0], 0.5)  },
                cursor: 'pointer',
            } }>
            <Flex sx={ {
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '9px',
                color: module.checked? theme.colors.primary[5] : theme.black,
                '& div svg': { strokeWidth: 1.2,},
            } }>
                <AvailableModuleConfigTerminalsIcon moduleName={ module.value } checked={ module.checked } />
                <Text sx={ {

                    textAlign: 'center',
                    fontSize: rem(16),
                    fontWeight: 400,
                    letterSpacing: 0.3,
                } }>{ module.name }</Text>
            </Flex>

        </Box>
    );
};

export default CardModule;

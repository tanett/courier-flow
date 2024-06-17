import React from 'react';
import { Box, Flex, Text, useMantineTheme } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useStyles } from './styles';
import cn from 'classnames';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { typeListModules } from '../types';
import { useGetModulesList } from 'features/terminal-configurations-details/hooks/use-get-modules-list';
import { EmptyElement } from 'shared/ui/empty-element';
import { useLingui } from '@lingui/react';


export const ListModulesForConfigurationTerminals: React.FC<typeListModules> = ({ data }) => {

    const { classes } = useStyles();

    const {i18n}=useLingui()

    const theme = useMantineTheme();

    const {
        modules,
        isLoading
    } = useGetModulesList(data.availableModules.map(item => item.code));


// ---------------------------------------------------------------------------------------------------------------------------------------

    return (
        <Box sx={ { flexGrow: 1 } } className={ classes.dataContainer }>
            <Flex className={ classes.headerWrapper }>
                <Text className={ classes.title }><Trans>Available modules</Trans></Text>

            </Flex>

            <Box className={ classes.listContainer } >
                { modules
                    ? modules?.length > 0
                        ? <>{
                            modules.map((item, index) => {

                                return <Flex
                                    key={ item.code }
                                    align={ 'center' }
                                    className={ cn([ classes.listItem ]) }>
                                    <div className={ classes.marker }/>
                                    <Text truncate>{ item.name }</Text>
                                </Flex>;

                            })
                        }
                        </>
                        : <Flex align={ 'center' } justify={ 'center' } sx={ {
                            textAlign: 'center',
                            height: '100%',
                            minHeight: '200px',
                            backgroundColor: theme.colors.gray[0],
                        } }><EmptyElement
                            withBorder={ false }
                            withIcon={false}
                            title1={ i18n._(t`There are not available modules`) }
                        /></Flex>
                    : <LoaderOverlay/>
                }

                { isLoading && <LoaderOverlay/> }
            </Box>
        </Box>
    );

};

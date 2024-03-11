import { Flex, Image, Group, Collapse, ActionIcon, Box } from '@mantine/core';
import React, { Fragment, useEffect, useState } from 'react';
import { useStyles } from './styles';
import { dynamicActivate, getSystemLanguage } from 'app/providers/with-locales/with-locales';
import { LANGUAGES, locales } from 'app/config/languages';
import flagRu from '../../../shared/images/flagRu.svg';
import flagUz from '../../../shared/images/flagUZ.svg';
import flagUK from '../../../shared/images/flagUK.svg';
import { useDisclosure, useFocusWithin } from '@mantine/hooks';
import cn from 'classnames';

export const LanguageSelectorWelcome: React.FC = () => {

    const { classes } = useStyles();
    const { ref, focused } = useFocusWithin();
    const [ value, setValue ] = useState<string >(getSystemLanguage());

    const [ opened, { toggle } ] = useDisclosure(false);

    useEffect(() => {

        if (opened && !focused){

            toggle();

        }

    }, [ focused ]);

    const onChangeLanguage = async (newValue: string) => {

        setValue(newValue);

        if (newValue) {

            await dynamicActivate(newValue);

        }

        toggle();

    };


    const getActionIconWithFlag = (langValue: string) => {

        let href = '';
        switch (langValue) {

        case LANGUAGES.EN :
            href = flagUK;
            break;
        case LANGUAGES.RU :
            href = flagRu;
            break;
        case LANGUAGES.UZ :
            href = flagUz;
            break;
        default :
            href = '';

        }

        return <ActionIcon onClick={() => onChangeLanguage(langValue)}
            className={cn(classes.actionIcon, langValue === value ? opened ? classes.active : classes.selected : '')}>
            <Image src={ href || '' } className={classes.image}/>
        </ActionIcon>;

    };


    return (
        <Flex className={classes.flexWrapper} ref={ref}>
            <Box maw={ 48 } mx="auto">
                <Group position="center" mb={ 6 }>
                    {getActionIconWithFlag(value)}
                </Group>

                <Collapse in={ opened } transitionDuration={ 200 } transitionTimingFunction="linear">
                    <Box className={classes.dropDown}>
                        {
                            locales.filter(item => item.value !== value)
                                .map(notSelectedItem => {

                                    return <Fragment key={notSelectedItem.label}>
                                        { getActionIconWithFlag(notSelectedItem.value) }
                                    </Fragment>;


                                })
                        }</Box>
                </Collapse>
            </Box>
        </Flex>
    );

};

import React from 'react';
import { Box, Button, Flex, rem, Text, useMantineTheme } from '@mantine/core';
import { typeButtonBlockForSelectBlockUnblock } from 'shared/ui/ButtonBlockForSelectBlockUnblockInFormFilter/types';

export const ButtonBlockForSelectBlockUnblockInFilterForm: React.FC<typeButtonBlockForSelectBlockUnblock> = ({
    form,
    path,
    label,
    titleBtnLeft,
    titleBtnRight
}) => {

    const theme = useMantineTheme();

    return (
        <Box sx={ {
            fontWeight: 500,
            fontSize: theme.fontSizes.md,
            lineHeight: rem(19),
            letterSpacing: rem(0.3),
        } }>
            <Text>{label}</Text>
            <Flex gap={ 18 } wrap={ 'nowrap' } mt={ 6 }>
                <Button
                    key={ titleBtnLeft }
                    variant={ form.values[path] === undefined ? 'outline' : form.values[path] ? 'filled' : 'outline' }
                    sx={ {
                        width: '100%',
                        border: `1px solid ${ theme.colors.borderColor[0] }`,
                        borderRadius: rem(4),
                        fontWeight: 500,
                        fontSize: theme.fontSizes.md,
                        letterSpacing: '0.3px',
                    } }
                    onClick={ () => form.setFieldValue(path, form.values[path] === true ? undefined : true) }
                >{titleBtnLeft}</Button>
                <Button
                    key={ titleBtnRight }
                    variant={ form.values[path] === undefined ? 'outline' : !form.values[path] ? 'filled' : 'outline' }
                    sx={ {
                        width: '100%',
                        border: `1px solid ${ theme.colors.borderColor[0] }`,
                        borderRadius: rem(4),
                        fontSize: theme.fontSizes.md,
                        letterSpacing: '0.3px',
                        fontWeight: 500,
                    } }
                    onClick={ () => form.setFieldValue(path, form.values[path] === false ? undefined : false) }
                >{titleBtnRight}</Button>

            </Flex>

        </Box>
    );
};

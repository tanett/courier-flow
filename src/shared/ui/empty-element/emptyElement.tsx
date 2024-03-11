import React from 'react';
import { Box, Flex, Text } from '@mantine/core';
import img from 'shared/images/zzBubbleIcon.svg';
import { t } from '@lingui/macro';
import { useStyles } from 'shared/ui/empty-element/styles';

export const EmptyElement: React.FC<{title1: string, title2?: string}> = ({ title1, title2 }) => {

    const { classes } = useStyles();
    return (
        <Box className={classes.wrapper} >
            <Flex justify={'center'} mb={6}>
                <img src={img} alt={t`empty list`} className={classes.img}/>
            </Flex>
            <Text className={classes.title}>{title1}</Text>
            <Text className={classes.title}>{title2}</Text>
        </Box>
    );

};

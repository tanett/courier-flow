import React from 'react';
import { Box, Flex, Text } from '@mantine/core';
import img from 'shared/images/zzBubbleIcon.svg';
import { t } from '@lingui/macro';
import { useStyles } from 'shared/ui/empty-element/styles';
import cn from 'classnames';

export const EmptyElement: React.FC<{title1: string, title2?: string, withBorder?: boolean, withIcon?: boolean}> = ({ title1, title2, withBorder=true, withIcon=true }) => {

    const { classes } = useStyles();
    return (
        <Box className={cn(classes.wrapper, (withBorder && classes.withBorder) )} >
            <Flex justify={'center'} mb={6}>
                {withIcon && <img src={ img } alt={ t`empty list` } className={ classes.img }/> }
            </Flex>
            <Text className={classes.title}>{title1}</Text>
            <Text className={classes.title}>{title2}</Text>
        </Box>
    );

};

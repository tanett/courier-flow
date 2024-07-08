import React from 'react';
import { typeDateTimeInLine } from './types';
import { Flex, Text, useMantineTheme } from '@mantine/core';

import dayjs from 'dayjs';

const DateTimeInLine: React.FC<typeDateTimeInLine> = ({
    date,
    fontWeightDate=400,
    fontWeightTime=400,
    fontSizeDate='16px',
    fontSizeTime='14px',
    colorTimeGray= true
}) => {

    const theme = useMantineTheme();

    return (
        <Flex gap={ 4 } align={'center'} wrap={'wrap'} rowGap={2}>
            <Text sx={{
                fontSize: fontSizeDate,
                fontWeight: fontWeightDate,
            }}>{ dayjs(date).format('DD.MM.YYYY') || '' },</Text>
            <Text
                sx={{
                    fontSize: fontSizeTime,
                    fontWeight: fontWeightTime,
                    color: colorTimeGray ? theme.colors.gray[5]: undefined,
                }}

            >{ dayjs(date).format('HH:mm:ss') }</Text>
        </Flex>
    );
};

export default DateTimeInLine;

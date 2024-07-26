import React, { useEffect, useState } from 'react';
import { Badge, useMantineTheme } from '@mantine/core';
import { useStyles } from './styles';
import { typeBadgeOrdersStatus } from './types';
import { OrderStatuses } from '../../../entities/orders/model/orders-statuses';
import { useSelectorT } from 'app/state';

const BadgeOrdersStatus:React.FC<typeBadgeOrdersStatus> = ({ statusCode }) => {

    const { classes } = useStyles();

    const [currentStatusName, setCurrentStatusName] = useState<string>('');

    const statuses = useSelectorT(state => state.orders.statuses);

    useEffect(() => {
        if(statuses){
            const nameFromState = statuses.find(item=>item.code === statusCode)?.name || statusCode;
            setCurrentStatusName(nameFromState)
        }

    }, [statuses]);


    const theme = useMantineTheme();

    const getColor = (statusCode: string)=>{
        switch (statusCode){
        case OrderStatuses.CANCELLED:
            return theme.colors.red[5];
        case OrderStatuses.COMPLETED:
            return theme.colors.green[5];
        case OrderStatuses.CREATED:
            return theme.colors.primary[5];
        case OrderStatuses.DELIVERING:
            return theme.colors.violet[4];
        case OrderStatuses.PROCESSING:
            return theme.colors.yellow[4];
        case OrderStatuses.WAITING_FOR_DELIVERY:
            return theme.colors.gray[3];
        default: return theme.black;
        }
    }



    return (
        <Badge variant={'outline'}
               className={classes.badge}
               sx={{
                   color: statusCode === OrderStatuses.WAITING_FOR_DELIVERY? theme.colors.gray[5] : getColor(statusCode),
                   backgroundColor: theme.fn.rgba(getColor(statusCode), 0.05),
                   borderColor: getColor(statusCode),
               } }

               size={'md'}
               radius={'xs'}
            >{ currentStatusName }</Badge>
    );

};

export default BadgeOrdersStatus;

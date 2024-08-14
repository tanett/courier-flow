import { useStyles } from './styles';
import React from 'react';
import { cashDeskTypes } from '../../../../entities/cash-desk-operations/model/types';
import { EncashmentIcon } from '../icons/encashment-icon';
import { Trans } from '@lingui/macro';
import { SaleIcon } from '../icons/sale-icon';
import { RefundIcon } from '../icons/refund-icon';
import { CorrectionIcon } from '../icons/correction-icon';

export const CashDeskOperationType: React.FC<{operationType: cashDeskTypes}> = ({ operationType }) => {

    const { classes } = useStyles();

    let icon = null;

    switch (operationType) {

    case 'SALE' :
        icon = <><SaleIcon iconClass={classes.icon}/><Trans>Sale</Trans></>;
        break;
    case 'ENCASHMENT' :
        icon = <><EncashmentIcon iconClass={classes.icon}/><Trans>Encashment</Trans></>;
        break;
    case 'REFUND' :
        icon = <><RefundIcon iconClass={classes.icon}/><Trans>Refund</Trans></>;
        break;
    case 'CREDIT' :
        icon = <>{/* <RefundIcon iconClass={classes.icon}/>*/}<Trans>Credit</Trans></>; // TODO: add icon
        break;
    case 'MANUAL_REFILL' :
    case 'MANUAL_WRITE_OFF' :
        icon = <><CorrectionIcon iconClass={classes.icon}/><Trans>Correction</Trans></>;
        break;
    default :
        icon = <Trans>Unknown operation</Trans>;

    }

    return <div className={classes.container}>
        {icon}
    </div>;

};

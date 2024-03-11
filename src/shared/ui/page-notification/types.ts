import { NOTIFICATION_TYPES } from './constants';
import React from 'react';
import { TransProps } from '@lingui/react';

export interface typeNotification {
    id: number,
    type: NOTIFICATION_TYPES,
    message: string | React.ReactElement<React.FC<TransProps>>
}

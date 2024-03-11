import React, { PropsWithChildren } from 'react';
import { TransProps } from '@lingui/react';

export interface iFieldsetForForm extends PropsWithChildren {
    title: string | React.ReactElement<React.FC<TransProps>>;
}

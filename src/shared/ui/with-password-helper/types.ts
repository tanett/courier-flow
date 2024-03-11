import React, { PropsWithChildren } from 'react';
import { TransProps } from '@lingui/react';

export interface typeWithPasswordHelperProps extends PropsWithChildren {
    password: string
}

export interface typeRuleProps {
    isCheck: boolean,
    text:React.ReactElement<React.FC<TransProps>>
}

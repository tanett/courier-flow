import React from 'react';
import { typeRuleProps } from './types';
import { useStyles } from './styles';

export const Rule: React.FC<typeRuleProps> = ({ isCheck, text }) => {

    const { classes } = useStyles();

    return (
        <div className={`${classes.rule}${isCheck ? ' ' + classes.checked : ''}`}>
            <div className={classes.iconWrapper}>
                <svg xmlns="http://www.w3.org/2000/svg" className={classes.icon} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M5 12l5 5l10 -10" />
                </svg>
            </div>
            <div className={classes.text}>{text}</div>
        </div>

    );

};

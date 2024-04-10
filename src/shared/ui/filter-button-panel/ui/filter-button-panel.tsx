import React from 'react';
import { typeFilterButtonPanelProps } from '../types/types';
import { Flex } from '@mantine/core';
import { useStyles } from './styles';
import cn from 'classnames';
import { Trans } from '@lingui/macro';

export const FilterButtonPanel: React.FC<typeFilterButtonPanelProps> = ({ value, onChange, data, label }) => {

    if (!data.length) return null;

    const { classes } = useStyles();

    return (<div>
        {label && <div className={ classes.label }>{ label }</div> }
        <Flex className={classes.wrapper}>
            {data.map(item => <button
                key={item.label}
                type="button"
                onClick={(e) => {

                    if (e.detail > 0) (e.target as HTMLButtonElement).blur();
                    onChange(item.value);

                }}
                className={cn(classes.button, { [ classes[ 'active' ] ]: item.value === value })}
            >
                {item.label}
            </button>)}
        </Flex>
    </div>);

};

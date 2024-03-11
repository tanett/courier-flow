import React, { useEffect, useState } from 'react';
import { ActionIcon, Input } from '@mantine/core';
import { typeFindBlock } from '../types/types';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useDebouncedValue, useFocusWithin } from '@mantine/hooks';
import { useStyles } from './styles';
import { useUrlParams } from '../../../hooks/use-url-params/use-url-params';
import { queryParamsNames } from '../../../../app/config/api-constants';

export const FindBlock: React.FC<typeFindBlock> = ({ placeholder }) => {

    const { classes } = useStyles();

    const urlParams = useUrlParams();

    const { searchPhrase } = urlParams;

    const [ value, setValue ] = useState(searchPhrase && typeof searchPhrase === 'string' ? searchPhrase : '');

    const { ref: inputRef, focused: inputFocused } = useFocusWithin();

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.value !== ' ') setValue(e.target.value);

    };
    const [ debounced ] = useDebouncedValue(value, 800);

    const closeHandler = () => {

        setValue('');

    };

    useEffect(() => {

        if ((debounced.length === 0 && inputFocused) || debounced.length >= 3) {

            urlParams.setSearchParams({
                [ queryParamsNames.searchPhrase ]: debounced ? debounced : undefined,
                [ queryParamsNames.pageNumber ]: undefined,
            });

        }
        if (value === ''){

            urlParams.setSearchParams({ [ queryParamsNames.searchPhrase ]: undefined });

        }


    }, [ debounced ]);

    return (
        <Input
            className={classes.inputField}
            ref={inputRef}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChangeHandler(e)}
            icon={<MagnifyingGlassIcon className={classes.iconFind} />}
            rightSection={value && <ActionIcon onClick={closeHandler}>
                <XMarkIcon className={classes.iconClose} />
            </ActionIcon>}
        />
    );

};

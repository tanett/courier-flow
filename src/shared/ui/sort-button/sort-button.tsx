import React, { useEffect, useState } from 'react';
import { typeSortButton } from './types';
import { ActionIcon, useMantineTheme } from '@mantine/core';
import { SortIcon } from 'shared/ui/svg-custom-icons/sort-icon/sort-icon';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { queryParamsNames } from 'app/config/api-constants';
import { sortDirection as initSortDirection } from 'app/api/types';

const SortButton: React.FC<typeSortButton> = ({
    id,
    disabled,
    sortName,
    initialSortDirection,
    isDefaultSorting

}) => {

    const theme = useMantineTheme();
    const urlParams = useUrlParams();

    const { sortDirection,sortName: sortNameFromUrl } = urlParams;

    const [ value, setValue ] = useState(sortDirection ? sortDirection : initialSortDirection);

    useEffect(() => {

        urlParams.setSearchParams(  { [queryParamsNames.sortDirection]: value,});


    }, [ value ]);

    const onBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        if(sortName && sortName !== sortNameFromUrl) {
            urlParams.setSearchParams({ [queryParamsNames.sortName]: sortName, });
        }

        setValue(value === initSortDirection.asc ? initSortDirection.dec : initSortDirection.asc,);

    };

    return (
        <ActionIcon
            disabled={ disabled }
            id={ id }
            onClick={ onBtnClick }
            sx={ { transform: value === initSortDirection.dec ? 'none' : 'rotate(0.5turn)' } }>
            <SortIcon
                color1={ sortName
                    ? isDefaultSorting
                        ? sortNameFromUrl === undefined
                            ? theme.fn.rgba('#000', 0.5)
                            :  sortNameFromUrl === sortName ? theme.fn.rgba('#000', 0.5) : theme.fn.rgba('#000', 0.25)
                        : sortNameFromUrl === sortName ? theme.fn.rgba('#000', 0.5) : theme.fn.rgba('#000', 0.25)
                    : theme.fn.rgba('#000', 0.5)}
                color2={ theme.fn.rgba('#000', 0.25) }/>
        </ActionIcon>
    );
};

export default SortButton;

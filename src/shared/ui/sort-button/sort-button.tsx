import React, { useEffect, useState } from 'react';
import { typeSortButton } from './types';
import { ActionIcon, useMantineTheme } from '@mantine/core';
import { SortIcon } from 'shared/ui/svg-custom-icons/sort-icon/sort-icon';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';
import { queryParamsNames } from 'app/config/api-constants';
import { sortDirection as initialSortDirection } from 'app/api/types';

const SortButton: React.FC<typeSortButton> = ({
    id,
    disabled,

}) => {

    const theme = useMantineTheme();
    const urlParams = useUrlParams();

    const { sortDirection } = urlParams;

    const [ value, setValue ] = useState(sortDirection ? sortDirection : initialSortDirection.asc);


    useEffect(() => {

        urlParams.setSearchParams({
            [queryParamsNames.sortDirection]: value,
            [queryParamsNames.pageNumber]: undefined,
        });


    }, [ value ]);

    const onBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        setValue(value === initialSortDirection.asc ? initialSortDirection.dec : initialSortDirection.asc,);

    };

    return (
        <ActionIcon
            disabled={ disabled }
            id={ id }
            onClick={ onBtnClick }
            sx={ { transform: value === initialSortDirection.dec ? 'none' : 'rotate(0.5turn)' } }>
            <SortIcon
                color1={ theme.fn.rgba('#000', 0.5) }
                color2={ theme.fn.rgba('#000', 0.25) }/>
        </ActionIcon>
    );
};

export default SortButton;

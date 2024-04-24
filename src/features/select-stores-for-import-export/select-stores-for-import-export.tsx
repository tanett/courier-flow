import React, { useEffect, useState } from 'react';
import { ActionIcon, Box, Button, Flex, Input, Text, useMantineTheme } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { CheckIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useStyles } from './styles';
import { useDebouncedValue, useFocusWithin } from '@mantine/hooks';
import { useAppDispatchT } from 'app/state';
import { useLazySearchStoreQuery } from '../../entities/stores/api/api';
import { sortDirection, typeResponseError, typeSearchRequest } from 'app/api/types';
import { typeSearchFilterStore } from '../../entities/stores/api/types';
import { errorHandler } from 'app/utils/errorHandler';
import cn from 'classnames';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { typeSelectStoresForImportExport, typeStoreListChecked } from './types';


export const SelectStoresForImportExport: React.FC<typeSelectStoresForImportExport> = ({
    setCountAllStores,
    setSelectedStores,
    selectedStores,
    setIsAllChecked,
    isAllChecked

}) => {

    const { i18n } = useLingui();
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const dispatch = useAppDispatchT();

    const [ searchStoreValue, onSearchStoreChange ] = useState('');

    const [ debouncedSearchValue ] = useDebouncedValue(searchStoreValue, 500);

    const [ storesList, setStoresList ] = useState<typeStoreListChecked[] | null>(null);

    const [ firstList, setFirstList ] = useState<typeStoreListChecked[]>([]);

    const [ getStores, { isFetching } ] = useLazySearchStoreQuery();

    const getData = async (requestData: typeSearchRequest<typeSearchFilterStore, 'NAME'>, isFirst?: boolean) => {

        try {

            const response = await getStores(requestData).unwrap();

            const mapResponse = response.content.map(item => ({
                ...item,
                checked: isAllChecked
            }));

            setCountAllStores(response.totalElements);

            setStoresList(mapResponse);

            if (isFirst) {

                setFirstList(response.content.map(item => ({
                    ...item,
                    checked: false,
                })));
            }

        } catch (err) {

            errorHandler(err as typeResponseError, 'getStoresInSelect', dispatch);

        }

    };

    useEffect(() => {

        const requestData: typeSearchRequest<typeSearchFilterStore, 'NAME'> = {
            filter: { archived: false },
            pagination: {
                pageNumber: 0,
                pageSize: 50,
            },
            sorts: [
                {
                    sort: 'NAME',
                    direction: sortDirection.asc,
                }
            ],
        };

        getData(requestData, true).then();

    }, []);


    useEffect(() => {

        if (searchStoreValue.trim().length) {

            const requestData: typeSearchRequest<typeSearchFilterStore, 'NAME'> = {
                filter: {
                    archived: false,
                    nameContains: searchStoreValue,
                },
                pagination: {
                    pageNumber: 0,
                    pageSize: 30,
                },
                sorts: [
                    {
                        sort: 'NAME',
                        direction: sortDirection.asc,
                    }
                ],
            };

            getData(requestData).then();

        } else {

            onEmptySearchHandler();

        }

    }, [ debouncedSearchValue ]);


    const {
        ref: inputRef,
        focused: inputFocused
    } = useFocusWithin();

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.value !== ' ') onSearchStoreChange(e.target.value);

    };

    const onEmptySearchHandler = () => {
        const selectedIds = selectedStores.map(item => item.id);

        if (selectedIds.length > 0) {

            const newFirstList = [ ...selectedStores, ...firstList.filter(item => !selectedIds.includes(item.id)) ];
            setFirstList([ ...newFirstList ]);
            setStoresList([ ...newFirstList ]);

        } else {
            setStoresList([ ...firstList ]);
        }
    };

    const closeHandler = () => {

        onSearchStoreChange('');

        onEmptySearchHandler();

    };

    const onStoreClick = (store: typeStoreListChecked) => {
        if (storesList) {
            if (store.checked) {
                if (isAllChecked) setIsAllChecked(false);
                setSelectedStores(prevState => prevState.filter(item => item.id !== store.id));
            } else {
                setSelectedStores(prev => ([ ...prev, {
                    ...store,
                    checked: true
                } ]));
            }
            setStoresList(storesList.map(item => (item.id === store.id
                ? {
                    ...item,
                    checked: !item.checked
                }
                : item)));
        }
    };


    const onResetClick = () => {
        if (storesList) {
            if (isAllChecked) setIsAllChecked(false);
            setSelectedStores([]);
            setStoresList(storesList.map(item => ({
                ...item,
                checked: false
            })));
            setFirstList(firstList.map(item => ({
                ...item,
                checked: false
            })));
            onSearchStoreChange('');
        }
    };

    const onSelectAllClick = () => {
        if (storesList) {
            setIsAllChecked(true);
            const checkedList = storesList.map(item => ({
                ...item,
                checked: true
            }));
            setStoresList(checkedList);
            const selectedIds = selectedStores.map(item => item.id);
            setSelectedStores([ ...selectedStores, ...checkedList.filter(item => !selectedIds.includes(item.id)) ]);
        }
    };

    return (
        <>
            <Flex className={ classes.headerWrapper }>
                <Text className={ classes.title }><Trans>Select stores</Trans></Text>
                <Flex direction="row" gap={ 10 } align={ 'center' }>
                    <Button onClick={ () => onResetClick() }
                            variant={ 'subtle' }
                            className={ classes.btnLink }
                    ><Trans>Reset</Trans></Button>
                    <Button onClick={ () => onSelectAllClick() }
                            variant={ 'subtle' }
                            className={ classes.btnLink }
                    ><Trans>Select all</Trans></Button>
                </Flex>
            </Flex>
            <Box className={ classes.dataContainer }>
                <Input
                    className={ classes.inputField }
                    ref={ inputRef }
                    value={ searchStoreValue }
                    placeholder={ i18n._(t`Enter a store name`) }
                    onChange={ (e) => onChangeHandler(e) }
                    icon={ <MagnifyingGlassIcon className={ classes.iconFind }/> }
                    rightSection={ searchStoreValue && <ActionIcon onClick={ closeHandler }>
                        <XMarkIcon className={ classes.iconClose }/>
                    </ActionIcon> }
                    maxLength={ 100 }
                />
                <Box className={ classes.listContainer }>
                    { storesList
                        ? storesList?.length > 0
                            ? storesList.map((item) => {
                                return <Flex
                                    key={ item.id }
                                    onClick={ () => onStoreClick(item) }
                                    className={ cn([ classes.listItem, item.checked && classes.listItemChecked ]) }>
                                    <CheckIcon/>
                                    <Text truncate>{ item.name }</Text>
                                </Flex>;

                            })
                            : <Flex align={ 'center' } justify={ 'center' } sx={ {
                                textAlign: 'center',
                                height: '100%',
                                backgroundColor: theme.colors.gray[0]
                            } }><Trans>No stores with this name</Trans></Flex>
                        : <LoaderOverlay/>
                    }
                    { isFetching && <LoaderOverlay/> }
                </Box>
            </Box>
        </>
    );

};

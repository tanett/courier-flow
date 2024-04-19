import React, { useEffect, useState } from 'react';
import { ActionIcon, Box, Button, Flex, Input, Space, Text, useMantineTheme } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ArrowLongLeftIcon } from '@heroicons/react/16/solid';
import { CheckIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useStyles } from 'features/products-import/ui/select-stores/styles';
import { useDebouncedValue, useFocusWithin } from '@mantine/hooks';
import { useAppDispatchT } from 'app/state';
import { useLazySearchStoreQuery } from '../../../../entities/stores/api/api';
import { sortDirection, typeResponseError, typeSearchRequest } from 'app/api/types';
import { typeSearchFilterStore } from '../../../../entities/stores/api/types';
import { errorHandler } from 'app/utils/errorHandler';
import cn from 'classnames';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { typeSelectStores, typeStoreListChecked } from './types';
import { PRODUCT_IMPORT_TYPE_REQUEST } from '../../../../entities/products/api/types';


export const SelectStores: React.FC<typeSelectStores> = ({
    setStep,
    importOptions,
    setImportOptions
}) => {

    const { i18n } = useLingui();
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const dispatch = useAppDispatchT();

    const [ searchStoreValue, onSearchStoreChange ] = useState('');

    const [ debouncedSearchValue ] = useDebouncedValue(searchStoreValue, 500);

    const [ storesList, setStoresList ] = useState<typeStoreListChecked[] | null>(null);

    const [ firstList, setFirstList ] = useState<typeStoreListChecked[]>([]);

    const [ selectedStores, setSelectedStores ] = useState<typeStoreListChecked[]>(importOptions?.options ? importOptions.options.selectedStores : []);

    const [ isAllChecked, setIsAllChecked ] = useState(importOptions?.options ? importOptions.options.isAllSelected : false);

    const [ countAllStores, setCountAllStores ] = useState(0);

    const [ isError, setIsError ] = useState<string | null>(null);

    const [ getStores, {   isFetching   } ] = useLazySearchStoreQuery();

    const getData = async (requestData: typeSearchRequest<typeSearchFilterStore, 'NAME'>, isFirst?: boolean) => {

        try {

            const response = await getStores(requestData).unwrap();

            const selectedIds = selectedStores.map(item => item.id);

            const mapResponse = response.content.map(item => ({
                ...item,
                checked: isAllChecked ? true : selectedIds.includes(item.id),
            }));

            setCountAllStores(response.totalElements);

            if (isAllChecked) {
                setSelectedStores(prevState => ([ ...prevState, ...mapResponse ]));
            }
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

    useEffect(() => {
        if (isError && (selectedStores.length !== 0 || isAllChecked)) {
            setIsError(null);
        }
    }, [ selectedStores, isAllChecked ]);

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
                setSelectedStores(prevState => selectedStores.filter(item => item.id !== store.id));
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

    const onNextClick = () => {
        if (selectedStores.length === 0 && !isAllChecked) {
            setIsError(i18n._(t`Select at least one store`));
            return;
        }

        setImportOptions({
            importType: PRODUCT_IMPORT_TYPE_REQUEST.RETAIL_PRODUCT_FROM_FILTER,
            options: {
                isAllSelected: isAllChecked,
                countStores: isAllChecked ? countAllStores : storesList?.filter(item => item.checked).length || 0,
                selectedStores: isAllChecked ? [] : selectedStores
            }
        });
        setStep(2);
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
            setSelectedStores(checkedList);
        }
    };

    return (
        <Flex className={ classes.container }>
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
                            ? storesList.map((item, index) => {
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
            { isError && <Box className={ classes.error }>{ isError }</Box> }
            <Space h={ 24 }/>
            <div className={ classes.btnPanel }>
                <Button
                    leftIcon={ <ArrowLongLeftIcon strokeWidth={ 0.8 }/> }
                    onClick={ () => {
                        setStep(0);
                        setImportOptions(null);
                    } }
                    variant={ 'outline' }
                    className={ classes.button }
                >
                    <Trans>Come back</Trans></Button>
                <Button
                    onClick={ onNextClick }
                    variant={ 'filled' }
                    className={ classes.button }
                >
                    <Trans>Next</Trans></Button>
            </div>
        </Flex>
    );

};

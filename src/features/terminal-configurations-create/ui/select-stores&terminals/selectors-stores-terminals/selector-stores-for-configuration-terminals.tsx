import React, { useEffect, useRef, useState } from 'react';
import { ActionIcon, Box, Flex, Input, Text, UnstyledButton, useMantineTheme } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { CheckIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useStyles } from 'features/terminal-configurations-create/ui/select-stores&terminals/selectors-stores-terminals/styles';
import { useDebouncedValue, useFocusWithin, useIntersection } from '@mantine/hooks';
import { useAppDispatchT } from 'app/state';
import { useLazySearchStoreWithLinkedConfigurationQuery } from '../../../../../entities/stores/api/api';
import { sortDirection, typeResponseError, typeSearchRequest } from 'app/api/types';
import { typeSearchFilterStore } from '../../../../../entities/stores/api/types';
import { errorHandler } from 'app/utils/errorHandler';
import cn from 'classnames';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { typeSelectorForItems, typeStoreListChecked } from '../selectors-stores-terminals/types';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { Loader } from 'shared/ui/loader/loader';
import { pageSizeForSelectors } from 'app/config/page-size-for-pulling-in-selectors-and-lists';
import InfoIconWithTooltip from 'shared/ui/info-icon-with-tooltip/info-icon-with-tooltip';


export const SelectorStoresForConfigurationTerminals: React.FC<typeSelectorForItems> = ({
    label,
    form,
}) => {

    const { i18n } = useLingui();
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const dispatch = useAppDispatchT();

    const [ searchStoreValue, onSearchStoreChange ] = useState('');

    const [ debouncedSearchValue ] = useDebouncedValue(searchStoreValue, 800);

    const [ storesList, setStoresList ] = useState<typeStoreListChecked[] | null>(null);

    const [ firstList, setFirstList ] = useState<typeStoreListChecked[]>([]);

    const [ currentPagination, setCurrentPagination ] = useState<typeTablePagination | undefined>(undefined);

    const [ isPageLoading, setIsPageLoading ] = useState(false);

    const [ getStores, { isFetching } ] = useLazySearchStoreWithLinkedConfigurationQuery();

    const getData = async (requestData: typeSearchRequest<typeSearchFilterStore, 'NAME'>, isFirst?: boolean, isChangePage?: boolean) => {

        if (isChangePage) setIsPageLoading(true);

        try {

            const response = await getStores(requestData).unwrap();

            const mapResponse = response.content.map(item => ({
                ...item,
                checked: form.values.storeIds.includes(item.id),
            }));

            const pagination = response?.totalPages
                ? {
                    pageNumber: response.pageNumber,
                    totalPages: response.totalPages,
                    totalElements: response.totalElements,
                    pageSize: response.pageSize,
                }
                : undefined;
            setCurrentPagination(pagination);

            setStoresList(isChangePage ? storesList ? [ ...storesList, ...mapResponse ] : mapResponse : mapResponse);

            const firstListIds = firstList.map(item => item.id);
            setFirstList([ ...firstList, ...response.content.map(item => ({
                ...item,
                checked: false,
            })).filter(item => !firstListIds.includes(item.id)) ]);

            if (isFirst) {

                setFirstList(response.content.map(item => ({
                    ...item,
                    checked: false,
                })));

            }

        } catch (err) {

            errorHandler(err as typeResponseError, 'getStoresInSelect', dispatch);

        }

        if (isChangePage) setIsPageLoading(false);

    };

    // first data loading ------------------------------------------------------------------------------------------
    useEffect(() => {

        const requestData: typeSearchRequest<typeSearchFilterStore, 'NAME'> = {
            filter: { archived: false },
            pagination: {
                pageNumber: currentPagination ? currentPagination.pageNumber : 0,
                pageSize: pageSizeForSelectors,
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


// lazy loader - observer intersection --------------------------------------------------------------------------------------------------------------

    const containerRef = useRef<HTMLInputElement | null>(null);

    const {
        ref: intersectionRef,
        entry: intersectionEntry
    } = useIntersection({
        root: containerRef.current,
        rootMargin: '10px',
        threshold: 1,
    });

    useEffect(() => {
        if (intersectionEntry && intersectionEntry.isIntersecting && currentPagination) {

            const requestData: typeSearchRequest<typeSearchFilterStore, 'NAME'> = {
                filter: {
                    archived: false,
                    nameContains: searchStoreValue?.trim().length ? searchStoreValue.trim() : undefined,
                },
                pagination: {
                    pageNumber: currentPagination.pageNumber + 1,
                    pageSize: pageSizeForSelectors,
                },
                sorts: [
                    {
                        sort: 'NAME',
                        direction: sortDirection.asc,
                    }
                ],
            };

            getData(requestData, false, true).then();

            setCurrentPagination({
                ...currentPagination,
                pageNumber: currentPagination.pageNumber + 1
            });
        }
    }, [ intersectionEntry ]);

// search input ----------------------------------------------------------------------------------------------------------------------------------
    const {
        ref: inputRef,
        focused: inputFocused,
    } = useFocusWithin();

    //  observer search value --------------------------------------------------------------------------------------------------------------

    useEffect(() => {

        if (searchStoreValue.trim().length) {

            const requestData: typeSearchRequest<typeSearchFilterStore, 'NAME'> = {
                filter: {
                    archived: false,
                    nameContains: searchStoreValue,
                },
                pagination: {
                    pageNumber: currentPagination ? currentPagination.pageNumber : 0,
                    pageSize: pageSizeForSelectors,
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


    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.value !== ' ') onSearchStoreChange(e.target.value);

    };

    const onEmptySearchHandler = () => {
        if (storesList) {

            if (form.values.storeIds.length > 0) {

                const ids = storesList.map(item => item.id);

                const firstMapList = firstList.filter(item => !ids.includes(item.id)).map(item => ({
                    ...item,
                    checked: form.values.storeIds.includes(item.id)
                }));

                const newFirstList = [ ...storesList, ...firstMapList ];

                setFirstList([ ...newFirstList ]);
                setStoresList([ ...newFirstList ]);

            } else {

                setStoresList([ ...firstList ]);

            }
        }
    };

    const closeHandler = () => {

        onSearchStoreChange('');

        onEmptySearchHandler();

    };

    // --------------------------------------------------------------------------------------------------------------------------------------
    const onStoreClick = (store: typeStoreListChecked) => {

        if (storesList) {

            if (store.checked) {

                const indexInForm = form.values.storeIds.findIndex(item => item === store.id);
                form.removeListItem('storeIds', indexInForm);

            } else {

                form.insertListItem('storeIds', store.id);

            }

        }

    };

// ---------------------------------------------------------------------------------------------------------------------------------------
    const onResetClick = () => {

        if (storesList) {

            form.setFieldValue('storeIds', []);

            setFirstList(firstList.map(item => ({
                ...item,
                checked: false,
            })));

            onSearchStoreChange('');

        }

    };

    const onSelectAllClick = () => {

        if (storesList) {

            const checkedList = storesList.map(item => ({
                ...item,
                checked: true,
            }));

            setStoresList(checkedList);

            const selectedIds = checkedList.map(item => item.id);

            const newValueSet = new Set([ ...form.values.storeIds, ...selectedIds ]);

            form.setFieldValue('storeIds', Array.from(newValueSet));

        }

    };


    // observer for change form ------------------------------------------------------------------
    useEffect(() => {
        if (storesList) {

            const newList = storesList.map(item => {
                const isSelected = form.values.storeIds.findIndex(storeId => storeId === item.id) >= 0;

                return {
                    ...item,
                    checked: isSelected
                };
            });
            setStoresList(newList);
        }
    }, [ form.values.storeIds ]);

// ---------------------------------------------------------------------------------------------------------------------------------------

    return (
        <Box sx={ { flexGrow: 1 } }>
            <Flex className={ classes.headerWrapper }>
                <Text className={ classes.title }>{ label }</Text>
                <Flex direction="row" gap={ 18 } align={ 'center' } justify={ 'end' }>
                    { form.values.storeIds.length > 0 && <UnstyledButton onClick={ () => onResetClick() }
                                                                         variant={ 'subtle' }
                                                                         className={ classes.btnLink }
                    ><Trans>Reset</Trans></UnstyledButton> }
                    <UnstyledButton onClick={ () => onSelectAllClick() }
                                    variant={ 'subtle' }
                                    className={ classes.btnLink }
                                    c={ theme.colors.primary[5] }
                    ><Trans>Select all</Trans></UnstyledButton>
                </Flex>
            </Flex>
            <Box className={ classes.dataContainer } p={ 8 }>
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
                <Box className={ classes.listContainer } ref={ containerRef }>
                    { storesList
                        ? storesList?.length > 0
                            ? <>{
                                storesList.map((item, index) => {

                                    return <Flex
                                        key={ item.id }
                                        onClick={ () => onStoreClick(item) }
                                        className={ cn([ classes.listItem, item.checked && classes.listItemChecked, ]) }>
                                        <CheckIcon className={ item.checked ? classes.checkIconVisible : classes.checkIconNotVisible }/>
                                        <Flex sx={ {
                                            gap: '10px',
                                            maxWidth: '80%',
                                            width: 'fit-content',
                                        } }>
                                            <Box sx={ {
                                                flexGrow: 1,
                                                overflow: 'hidden',
                                            } }><Text truncate>{ item.name }</Text></Box>

                                            { !!item.linkedTerminalConfigId &&
                                                <InfoIconWithTooltip label={ <Trans>The store is linked to another configuration!<br/><br/>If you link a store to this configuration, it will be disconnected from the other one automatically.</Trans> }/>
                                            }
                                        </Flex>

                                    </Flex>;

                                })
                            }
                                {/* intersection target element */ }
                                { currentPagination && currentPagination.totalElements > storesList.length && <Flex justify={ 'center' } sx={ {
                                    height: '50px',
                                    position: 'relative',
                                    marginTop: '10px'
                                } } ref={ intersectionRef }>{ isPageLoading && <Loader size={ 'sm' }/> }</Flex> }
                            </>
                            : <Flex align={ 'center' } justify={ 'center' } sx={ {
                                textAlign: 'center',
                                height: '100%',
                                backgroundColor: theme.colors.gray[0],
                            } }>{ searchStoreValue?.length > 0
                                ? <Trans>No stores with this name</Trans>
                                : <Trans>No data</Trans> }</Flex>
                        : <LoaderOverlay/>
                    }
                    { (isFetching && !isPageLoading) && <LoaderOverlay/> }
                </Box>
            </Box>
        </Box>
    );

};

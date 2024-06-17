import React, { useEffect, useRef, useState } from 'react';
import { ActionIcon, Box, Flex, Input, Text, UnstyledButton, useMantineTheme } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { CheckIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useStyles } from 'features/terminal-configurations-create/ui/select-stores&terminals/selectors-stores-terminals/styles';
import { useDebouncedValue, useFocusWithin, useIntersection } from '@mantine/hooks';
import { useAppDispatchT } from 'app/state';
import { sortDirection, typeResponseError, typeSearchRequest } from 'app/api/types';
import { errorHandler } from 'app/utils/errorHandler';
import cn from 'classnames';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { typeSelectorForItems, typeTerminalsListChecked } from 'features/terminal-configurations-create/ui/select-stores&terminals/selectors-stores-terminals/types';
import { typeSearchTerminalsFilter } from '../../../../../entities/terminals/api/types';
import { useLazySearchTerminalsWithLinkedConfigurationQuery } from '../../../../../entities/terminals/api/api';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { Loader } from 'shared/ui/loader/loader';
import { pageSizeForSelectors } from 'app/config/page-size-for-pulling-in-selectors-and-lists';
import InfoIconWithTooltip from 'shared/ui/info-icon-with-tooltip/info-icon-with-tooltip';


export const SelectorTerminalsForConfigurationTerminals: React.FC<typeSelectorForItems> = ({
    label,
    form
}) => {

    const { i18n } = useLingui();
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const dispatch = useAppDispatchT();

    const [ searchTerminalsValue, onSearchTerminalsChange ] = useState('');

    const [ debouncedSearchValue ] = useDebouncedValue(searchTerminalsValue, 800);

    const [ terminalsList, setTerminalsList ] = useState<typeTerminalsListChecked[] | null>(null);

    const [ firstList, setFirstList ] = useState<typeTerminalsListChecked[]>([]);

    const [ currentPagination, setCurrentPagination ] = useState<typeTablePagination | undefined>(undefined);

    const [ isPageLoading, setIsPageLoading ] = useState(false);

    const [ getTerminals, { isFetching } ] = useLazySearchTerminalsWithLinkedConfigurationQuery();

    const getData = async (requestData: typeSearchRequest<typeSearchTerminalsFilter, 'CREATED_AT'>, isFirst?: boolean, isChangePage?: boolean) => {

        if (isChangePage) setIsPageLoading(true);

        try {

            const response = await getTerminals(requestData).unwrap();

            const mapResponse = response.content.map(item => ({
                ...item,
                checked: form.values.terminalIds.includes(item.id),
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

            setTerminalsList(isChangePage ? terminalsList ? [ ...terminalsList, ...mapResponse ] : mapResponse : mapResponse);

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

            errorHandler(err as typeResponseError, 'getTerminalsInSelect', dispatch);

        }

        if (isChangePage) setIsPageLoading(false);

    };

    // first data loading ------------------------------------------------------------------------------------------
    useEffect(() => {

        const requestData: typeSearchRequest<typeSearchTerminalsFilter, 'CREATED_AT'> = {
            filter: { archived: false },
            pagination: {
                pageNumber: currentPagination ? currentPagination.pageNumber : 0,
                pageSize: pageSizeForSelectors,
            },
            sorts: [
                {
                    sort: 'CREATED_AT',
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
        if (intersectionEntry && intersectionEntry.isIntersecting && currentPagination && currentPagination.totalPages > currentPagination.pageNumber + 1) {

            const requestData: typeSearchRequest<typeSearchTerminalsFilter, 'CREATED_AT'> = {
                filter: {
                    archived: false,
                    searchText: searchTerminalsValue?.trim().length ? searchTerminalsValue.trim() : undefined,
                },
                pagination: {
                    pageNumber: currentPagination.pageNumber + 1,
                    pageSize: pageSizeForSelectors,
                },
                sorts: [
                    {
                        sort: 'CREATED_AT',
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

    // search input -------------------------------------------------------------------------------------------------------------
    const {
        ref: inputRef,
        focused: inputFocused,
    } = useFocusWithin();

    //  observer search value ---------------------------------------------------------------------------------------------------
    useEffect(() => {

        if (searchTerminalsValue.trim().length) {

            const requestData: typeSearchRequest<typeSearchTerminalsFilter, 'CREATED_AT'> = {
                filter: {
                    archived: false,
                    searchText: searchTerminalsValue,
                },
                pagination: {
                    pageNumber: currentPagination ? currentPagination.pageNumber : 0,
                    pageSize: pageSizeForSelectors,
                },
                sorts: [
                    {
                        sort: 'CREATED_AT',
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

        if (e.target.value !== ' ') onSearchTerminalsChange(e.target.value);

    };

    const onEmptySearchHandler = () => {
        if (terminalsList) {
            if (form.values.terminalIds.length > 0) {
                const ids = terminalsList.map(item => item.id);

                const firstMapList = firstList.filter(item => !ids.includes(item.id)).map(item => ({
                    ...item,
                    checked: form.values.terminalIds.includes(item.id)
                }));

                const newFirstList = [ ...terminalsList, ...firstMapList ];

                setFirstList([ ...newFirstList ]);
                setTerminalsList([ ...newFirstList ]);
            } else {

                setTerminalsList([ ...firstList ]);

            }
        }

    };

    const closeHandler = () => {

        onSearchTerminalsChange('');

        onEmptySearchHandler();

    };


    // on terminal item click ----------------------------------------------------------------------------------------------------
    const onTerminalClick = (terminal: typeTerminalsListChecked) => {

        if (terminalsList) {
            if (terminal.checked) {

                const indexInForm = form.values.terminalIds.findIndex(item => item === terminal.id);
                form.removeListItem('terminalIds', indexInForm);

            } else {

                form.insertListItem('terminalIds', terminal.id);

            }
        }

    };

// ---------------------------------------------------------------------------------------------------------------------------------------
    const onResetClick = () => {

        if (terminalsList) {

            form.setFieldValue('terminalIds', []);

            setFirstList(firstList.map(item => ({
                ...item,
                checked: false,
            })));
            onSearchTerminalsChange('');

        }

    };
// ---------------------------------------------------------------------------------------------------------------------------------------
    const onSelectAllClick = () => {

        if (terminalsList) {
            const checkedList = terminalsList.map(item => ({
                ...item,
                checked: true,
            }));

            setTerminalsList(checkedList);

            const selectedIds = checkedList.map(item => item.id);

            const newValueSet = new Set([ ...form.values.terminalIds, ...selectedIds ]);

            form.setFieldValue('terminalIds', Array.from(newValueSet));
        }

    };

    // observer for change form ---------------------------------------------------------------
    useEffect(() => {
        if (terminalsList) {

            const newList = terminalsList.map(item => {
                const isSelected = form.values.terminalIds.findIndex(terminalId => terminalId === item.id) >= 0;

                return {
                    ...item,
                    checked: isSelected
                };
            });
            setTerminalsList(newList);
        }
    }, [ form.values.terminalIds ]);

    return (
        <Box sx={ { flexGrow: 1, } }>
            <Flex className={ classes.headerWrapper }>
                <Text className={ classes.title }>{ label }</Text>
                <Flex direction="row" gap={ 18 } align={ 'center' } justify={ 'end' }>
                    { form.values.terminalIds.length > 0 && <UnstyledButton onClick={ () => onResetClick() }
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
                    value={ searchTerminalsValue }
                    placeholder={ i18n._(t`Enter a serial number`) }
                    onChange={ (e) => onChangeHandler(e) }
                    icon={ <MagnifyingGlassIcon className={ classes.iconFind }/> }
                    rightSection={ searchTerminalsValue && <ActionIcon onClick={ closeHandler }>
                        <XMarkIcon className={ classes.iconClose }/>
                    </ActionIcon> }
                    maxLength={ 100 }
                />
                <Box className={ classes.listContainer } ref={ containerRef }>
                    { terminalsList
                        ? terminalsList?.length > 0
                            ? <>
                                { terminalsList.map((item) => {

                                    return <Flex
                                        key={ item.id }
                                        onClick={ () => onTerminalClick(item) }
                                        className={ cn([ classes.listItem, item.checked && classes.listItemChecked, ]) }>
                                        <CheckIcon className={ item.checked ? classes.checkIconVisible : classes.checkIconNotVisible }/>
                                        <Flex sx={ {
                                            gap: '10px',
                                            maxWidth: '90%',
                                            width: 'fit-content',

                                        } }>
                                            <Box sx={ {
                                                flexGrow: 1,
                                                overflow: 'hidden',
                                            } }><Text truncate>{ item.serialNumber }</Text></Box>

                                            {!!item.linkedTerminalConfigId && <InfoIconWithTooltip
                                                label={ <Trans>The terminal is linked to another configuration!<br/><br/>If you link a terminal to this configuration, it will be disconnected from the other one automatically.</Trans> }/> }

                                        </Flex>

                                    </Flex>;

                                }) }
                                {/* intersection target element */ }
                                { currentPagination && currentPagination.totalElements > terminalsList.length && <Flex justify={ 'center' } sx={ {
                                    height: '50px',
                                    position: 'relative',
                                    marginTop: '10px'
                                } } ref={ intersectionRef }>{ isPageLoading && <Loader size={ 'sm' }/> }</Flex> }
                            </>

                            : <Flex align={ 'center' } justify={ 'center' } sx={ {
                                textAlign: 'center',
                                height: '100%',
                                backgroundColor: theme.colors.gray[0],
                            } }>{ searchTerminalsValue?.length > 0
                                ? <Trans>No terminals with this serial number</Trans>
                                : <Trans>No data</Trans> }</Flex>
                        : <LoaderOverlay/>
                    }
                    { (isFetching && !isPageLoading) && <LoaderOverlay/> }
                </Box>
            </Box>
        </Box>
    );

};

import React, { useEffect, useRef, useState } from 'react';
import { ActionIcon, Box, Flex, Input, Text, useMantineTheme } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { LockClosedIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useStyles } from './styles';
import { useDebouncedValue, useFocusWithin, useIntersection } from '@mantine/hooks';
import { useAppDispatchT } from 'app/state';
import { sortDirection, typeResponseError, typeSearchRequest } from 'app/api/types';
import { errorHandler } from 'app/utils/errorHandler';
import cn from 'classnames';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { typeSelectProductCategory } from 'features/terminal-configurations-create/ui/select-categories-for-terminal/ui/selector-product-category/types';
import { useLazySearchCategoryQuery } from '../../../../../../entities/category/api/api';
import { typeSearchFilterCategory } from '../../../../../../entities/category/api/types';
import { typeProductCategoryChecked } from 'features/terminal-configurations-create/types/types';
import { Loader } from 'shared/ui/loader/loader';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { pageSizeForSelectors } from 'app/config/page-size-for-pulling-in-selectors-and-lists';


export const SelectorProductCategory: React.FC<typeSelectProductCategory> = ({ form }) => {

    const { i18n } = useLingui();
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const dispatch = useAppDispatchT();

    const [ searchCategoryValue, onSearchCategoryChange ] = useState('');

    const [ debouncedSearchValue ] = useDebouncedValue(searchCategoryValue, 500);

    const [ categoriesList, setCategoriesList ] = useState<typeProductCategoryChecked[] | null>(null);

    const [ firstList, setFirstList ] = useState<typeProductCategoryChecked[]>([]);

    const [ currentPagination, setCurrentPagination ] = useState<typeTablePagination | undefined>(undefined);

    const [ isPageLoading, setIsPageLoading ] = useState(false);

    const [ getCategory, { isFetching } ] = useLazySearchCategoryQuery();

    const getData = async (requestData: typeSearchRequest<typeSearchFilterCategory, 'NAME'>, isFirst?: boolean, isChangePage?: boolean) => {

        if (isChangePage) setIsPageLoading(true);

        try {

            const response = await getCategory(requestData).unwrap();

            const mapResponse = response.content.map(item => {
                    const isChecked = form.values.productCategory.findIndex(category => item.id === category.id);
                    return {
                        ...item,
                        checked: isChecked >= 0,
                    };
                }
            );

            const pagination = response?.totalPages
                ? {
                    pageNumber: response.pageNumber,
                    totalPages: response.totalPages,
                    totalElements: response.totalElements,
                    pageSize: response.pageSize,
                }
                : undefined;
            setCurrentPagination(pagination);

            setCategoriesList(isChangePage? categoriesList? [...categoriesList,...mapResponse]: mapResponse : mapResponse);

            setFirstList([...firstList,...response.content.map(item => ({
                ...item,
                checked: false,
            }))]);

            if (isFirst) {

                setFirstList(response.content.map(item => ({
                    ...item,
                    checked: false,
                })));

            }

        } catch (err) {

            errorHandler(err as typeResponseError, 'getCategoriesInSelect', dispatch);

        }

        if (isChangePage) setIsPageLoading(false);

    };

    // first data loading ------------------------------------------------------------------------------------------

    useEffect(() => {

        const requestData: typeSearchRequest<typeSearchFilterCategory, 'NAME'> = {
            filter: {},
            pagination: {
                pageNumber: currentPagination? currentPagination.pageNumber : 0,
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
        if (intersectionEntry && intersectionEntry.isIntersecting && currentPagination && currentPagination.totalPages > currentPagination.pageNumber + 1 ) {

            const requestData: typeSearchRequest<typeSearchFilterCategory, 'NAME'> = {
                filter: { nameContains: searchCategoryValue?.trim().length ? searchCategoryValue.trim() : undefined, },
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

    //  observer search value ---------------------------------------------------------------------------------------------------
    useEffect(() => {

        if (searchCategoryValue.trim().length>2) {

            const requestData: typeSearchRequest<typeSearchFilterCategory, 'NAME'> = {
                filter: { nameContains: searchCategoryValue },
                pagination: {
                    pageNumber: currentPagination? currentPagination.pageNumber : 0,
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

    // search input -------------------------------------------------------------------------------------------------------------

    const {
        ref: inputRef,
        focused: inputFocused,
    } = useFocusWithin();

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.value !== ' ') onSearchCategoryChange(e.target.value);

    };

    const onEmptySearchHandler = () => {

        const selectedIds = form.values.productCategory.map(item => item.id);

        if (selectedIds.length > 0) {

            const newFirstList = [  ...firstList.filter(item => !selectedIds.includes(item.id)), ...form.values.productCategory, ];
            setFirstList([ ...newFirstList ]);
            setCategoriesList([ ...newFirstList ]);

        } else {

            setCategoriesList([ ...firstList ]);

        }

    };

    const closeHandler = () => {

        onSearchCategoryChange('');

        onEmptySearchHandler();

    };

    const onCategoryClick = (category: typeProductCategoryChecked,) => {

        if (categoriesList) {
            const indexInForm = form.values.productCategory.findIndex(item => item.id === category.id);
            if (category.checked && indexInForm >= 0) {
                //   form.removeListItem('productCategory', indexInForm);
                return;

            } else {
                form.insertListItem('productCategory', {
                    ...category,
                    checked: true,
                });

            }

            setCategoriesList(categoriesList.map(item => (item.id === category.id
                ? {
                    ...item,
                    checked: !item.checked,
                }
                : item)));

        }

    };

  // observer for change attached list
    useEffect(() => {
        if (categoriesList) {
            const newCategoriesList = categoriesList?.map(item => {
                const isSelected = form.values.productCategory.findIndex(category => category.id === item.id) >= 0;
                return {
                    ...item,
                    checked: isSelected
                };
            });
            setCategoriesList(newCategoriesList);
        }
    }, [ form.values.productCategory ]);


    return (
        <Box sx={ {
            flexGrow: 1,
            padding: '8px',
            position: 'relative'
        } }>

            <Box className={ classes.dataContainer } p={ 8 }>
                <Input
                    className={ classes.inputField }
                    ref={ inputRef }
                    value={ searchCategoryValue }
                    placeholder={ i18n._(t`Type a product category name`) }
                    onChange={ (e) => onChangeHandler(e) }
                    icon={ <MagnifyingGlassIcon className={ classes.iconFind }/> }
                    rightSection={ searchCategoryValue && <ActionIcon onClick={ closeHandler }>
                        <XMarkIcon className={ classes.iconClose }/>
                    </ActionIcon> }
                    maxLength={ 100 }
                />
                <Box className={ classes.listContainer }  ref={ containerRef }>
                    { categoriesList
                        ? categoriesList?.length > 0
                            ?<> { categoriesList.map((item) => {

                                return <Flex
                                    key={ item.id }
                                    onClick={ () => onCategoryClick(item) }
                                    className={ cn([ classes.listItem, item.checked && classes.listItemDisabled, ]) }>
                                    <LockClosedIcon className={ item.checked ? classes.checkIconVisible : classes.checkIconNotVisible }/>
                                    <Text truncate>{ item.name }</Text>
                                </Flex>;

                            }) }
                            {/* intersection target element */ }
                        { currentPagination && currentPagination.totalElements > categoriesList.length && <Flex justify={ 'center' } sx={ {
                            height: '50px',
                            position: 'relative',
                            marginTop: '10px'
                        } } ref={ intersectionRef }>{ isPageLoading && <Loader size={ 'sm' }/> }</Flex> }
                        </>
                            : <Flex align={ 'center' } justify={ 'center' } sx={ {
                                textAlign: 'center',
                                height: '100%',
                                backgroundColor: theme.colors.gray[0],
                            } }>{ searchCategoryValue?.length > 0
                                ? <Trans>No category with this name</Trans>
                                : <Trans>No data</Trans> }</Flex>
                        : <LoaderOverlay/>
                    }
                    { (isFetching && !isPageLoading) && <LoaderOverlay/> }
                </Box>
            </Box>
        </Box>
    );

};

import React, { useEffect, useRef, useState } from 'react';
import { ActionIcon, Box, Flex, Input, Text, UnstyledButton, useMantineTheme } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { CheckIcon, LockClosedIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useStyles } from './styles';
import { useDebouncedValue, useFocusWithin, useIntersection } from '@mantine/hooks';
import { useAppDispatchT } from 'app/state';
import { sortDirection, typeResponseError, typeSearchRequest } from 'app/api/types';
import { errorHandler } from 'app/utils/errorHandler';
import cn from 'classnames';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { typeTablePagination } from 'shared/ui/table/types/type';
import { Loader } from 'shared/ui/loader/loader';
import { pageSizeForSelectors } from 'app/config/page-size-for-pulling-in-selectors-and-lists';
import { typeSelectorForProducts } from 'features/orders-create/ui/selector-products/types';
import { typeRetailProduct } from '../../../../entities/retail-products/model/types';
import { useLazySearchRetailProductQuery } from '../../../../entities/retail-products/api/api';
import { typeSearchFilterRetailProduct } from '../../../../entities/retail-products/api/types';



export const SelectorProducts: React.FC<typeSelectorForProducts> = ({ form, }) => {

    const { i18n } = useLingui();
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const dispatch = useAppDispatchT();

    const [ searchValue, onSearchChange ] = useState('');

    const [ debouncedSearchValue ] = useDebouncedValue(searchValue, 800);

    const [ productsList, setProductsList ] = useState<typeRetailProduct[] | null>(null);

    const [ firstList, setFirstList ] = useState<typeRetailProduct[]>([]);

    const [ currentPagination, setCurrentPagination ] = useState<typeTablePagination | undefined>(undefined);

    const [ isPageLoading, setIsPageLoading ] = useState(false);

    const [ getProducts, { isFetching } ] = useLazySearchRetailProductQuery();

    const getData = async (requestData: typeSearchRequest<typeSearchFilterRetailProduct, 'PRODUCT_NAME'>, isFirst?: boolean, isChangePage?: boolean) => {

        if (isChangePage) setIsPageLoading(true);

        try {

            const response = await getProducts(requestData).unwrap();

            const mapResponse = response.content.map(item => ({
                ...item,
                // checked: form.values.storeIds.includes(item.id),
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

            setProductsList(isChangePage ? productsList ? [ ...productsList, ...mapResponse ] : mapResponse : mapResponse);

            const firstListIds = firstList.map(item => item.id);
            setFirstList([ ...firstList, ...response.content.map(item => ({
                ...item,
                // checked: false,
            })).filter(item => !firstListIds.includes(item.id)) ]);

            if (isFirst) {

                setFirstList(response.content.map(item => ({
                    ...item,
                    // checked: false,
                })));

            }

        } catch (err) {

            errorHandler(err as typeResponseError, 'getProductsInSelect', dispatch);

        }

        if (isChangePage) setIsPageLoading(false);

    };

    // first data loading ------------------------------------------------------------------------------------------
    useEffect(() => {

        const requestData: typeSearchRequest<typeSearchFilterRetailProduct, 'PRODUCT_NAME'> = {
            filter: { archived: false },
            pagination: {
                pageNumber: currentPagination ? currentPagination.pageNumber : 0,
                pageSize: pageSizeForSelectors,
            },
            sorts: [
                {
                    sort: 'PRODUCT_NAME',
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

            const requestData: typeSearchRequest<typeSearchFilterRetailProduct, 'PRODUCT_NAME'> = {
                filter: {
                    archived: false,

                    // nameContains: searchValue?.trim().length ? searchValue.trim() : undefined,
                },
                pagination: {
                    pageNumber: currentPagination.pageNumber + 1,
                    pageSize: pageSizeForSelectors,
                },
                sorts: [
                    {
                        sort: 'PRODUCT_NAME',
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

        if (searchValue.trim().length) {

            const requestData: typeSearchRequest<typeSearchFilterRetailProduct, 'PRODUCT_NAME'> = {
                filter: {
                    archived: false,
                    //  nameContains: searchStoreValue,
                },
                pagination: {
                    pageNumber: currentPagination ? currentPagination.pageNumber : 0,
                    pageSize: pageSizeForSelectors,
                },
                sorts: [
                    {
                        sort: 'PRODUCT_NAME',
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

        if (e.target.value !== ' ') onSearchChange(e.target.value);

    };

    const onEmptySearchHandler = () => {
        if (productsList) {
            setProductsList([ ...firstList ]);

        }

    };

    const closeHandler = () => {

        onSearchChange('');

        onEmptySearchHandler();

    };

    // --------------------------------------------------------------------------------------------------------------------------------------
    const onProductClick = (product: typeRetailProduct) => {

        if (productsList) {
            const isInCart = form.values.products.find(item => item.id === product.id);

            if (isInCart) {
                form.setFieldValue('products', form.values.products.map(item => product.id === item.id ? {
                    ...item,
                    amount: item.amount + 1
                } : item));
            } else {
                form.insertListItem('products', {
                    ...product,
                    amount: 1
                });
            }
        }

    };



// ---------------------------------------------------------------------------------------------------------------------------------------

    return (
        <Box sx={ { flexGrow: 1 } }>
            <Flex className={ classes.headerWrapper }>
                <Text className={ classes.title }><Trans>Choose products</Trans></Text>

            </Flex>
            <Box className={ classes.dataContainer } p={ 8 }>
                <Input
                    className={ classes.inputField }
                    ref={ inputRef }
                    value={ searchValue }
                    placeholder={ i18n._(t`Type product name`) }
                    onChange={ (e) => onChangeHandler(e) }
                    icon={ <MagnifyingGlassIcon className={ classes.iconFind }/> }
                    rightSection={ searchValue && <ActionIcon onClick={ closeHandler }>
                        <XMarkIcon className={ classes.iconClose }/>
                    </ActionIcon> }
                    maxLength={ 100 }
                />
                <Box className={ classes.listContainer } ref={ containerRef }>
                    { productsList
                        ? productsList?.length > 0
                            ? <>{
                                productsList.map((item, index) => {

                                    const isDisabled = form.values.storeId !== item.store.id;

                                    return <Flex
                                        key={ item.id }
                                        onClick={ isDisabled ? undefined : () =>  onProductClick(item) }
                                        className={ cn([ classes.listItem, isDisabled && classes.listItemDisabled ]) }>
                                         <LockClosedIcon className={ isDisabled ? classes.checkIconVisible : classes.checkIconNotVisible }/>
                                        <Flex sx={ {
                                            gap: '10px',
                                            maxWidth: '80%',
                                            width: 'fit-content',
                                        } }>
                                            <Box sx={ {
                                                flexGrow: 1,
                                                overflow: 'hidden',
                                            } }><Text truncate>{ item.product.name }</Text></Box>


                                        </Flex>

                                    </Flex>;

                                })
                            }
                                {/* intersection target element */ }
                                { currentPagination && currentPagination.totalElements > productsList.length && <Flex justify={ 'center' } sx={ {
                                    height: '50px',
                                    position: 'relative',
                                    marginTop: '10px'
                                } } ref={ intersectionRef }>{ isPageLoading && <Loader size={ 'sm' }/> }</Flex> }
                            </>
                            : <Flex align={ 'center' } justify={ 'center' } sx={ {
                                textAlign: 'center',
                                height: '100%',
                                backgroundColor: theme.colors.gray[0],
                            } }>{ searchValue?.length > 0
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

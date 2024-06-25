import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex, Text, useMantineTheme } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useStyles } from './styles';
import cn from 'classnames';
import { useGetProductsByCategoryList } from 'features/terminal-configurations-details/hooks/use-get-products-by-category-list';
import { useIntersection } from '@mantine/hooks';
import { Loader } from 'shared/ui/loader/loader';
import { LoaderOverlay } from 'shared/ui/loader-overlay';

const ListProductsInCategory: React.FC<{ categoryId: string }> = ({ categoryId }) => {

        const { i18n } = useLingui();
        const { classes } = useStyles();
        const theme = useMantineTheme();
        const [ pageNumber, setPageNumber ] = useState(0);

        const [ isPageLoading, setIsPageLoading ] = useState(false);

        const {
            productsList,
            isFetching,
            currentPagination
        } = useGetProductsByCategoryList(categoryId, pageNumber);

        // lazy loader - observer intersection --------------------------------------------------------------------------------------------------------------

        const containerRef = useRef<HTMLInputElement | null>(null);

        const {
            ref: intersectionRef,
            entry: intersectionEntry
        } = useIntersection({
            root: containerRef.current,
            rootMargin: '10px',
            threshold: 0.75,
        });

        useEffect(() => {

            if (intersectionEntry && intersectionEntry.isIntersecting) {
                setIsPageLoading(true);
                setPageNumber((currentPagination?.pageNumber || 0) + 1);

            }
        }, [ intersectionEntry ]);

        useEffect(() => {
            if (!isFetching && isPageLoading && !!productsList) {
                setIsPageLoading(false);
            }
        }, [ isFetching ]);

        return (
            <Box sx={ {
                overflowX: 'hidden',
                padding: '8px',
                flexGrow: 1,
                backgroundColor: theme.colors.primary[0],
                borderRadius: '4px',
                width: 'auto', maxWidth: 'none',
            } }>
                <Flex className={ classes.headerWrapper }>
                    <Text className={ classes.title }><Trans>Products in category</Trans></Text>
                </Flex>
                <Box className={ classes.listContainer } sx={{ width: 'auto', minWidth: '200px' }} ref={ containerRef }>
                    { productsList
                        ? productsList?.length > 0
                            ? <>{
                                productsList.map((item, index) => {

                                    return <Flex
                                        key={ item.id }
                                        align={ 'center' }
                                        className={ cn([ classes.listItemProduct ]) }>
                                        <div className={ classes.marker }/>
                                        <Box>{ item.name }</Box>
                                    </Flex>;

                                })
                            }
                                {/* intersection target element */ }
                                { currentPagination && currentPagination.totalElements > productsList.length && <Flex justify={ 'center' } sx={ {
                                    height: '25px',
                                    position: 'relative',
                                    marginTop: '5px'
                                } } ref={ intersectionRef }>{ isPageLoading && <Loader size={ 'sm' }/> }</Flex> }
                            </>
                            : <Flex align={ 'center' } justify={ 'center' } sx={ {
                                textAlign: 'center',
                                height: '100%',
                               padding: '10px',
                            } }>{ i18n._(t`There are not products`) }</Flex>
                        : <LoaderOverlay/>
                    }

                    { (isFetching && !isPageLoading) && <LoaderOverlay/> }

                </Box>

            </Box>
        )
            ;
    }
;

export default ListProductsInCategory;

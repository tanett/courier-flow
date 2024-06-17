import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex, Text, useMantineTheme } from '@mantine/core';
import { Trans } from '@lingui/macro';
import { useStyles } from './styles';
import cn from 'classnames';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { typeListStores } from '../types';
import { useGetStoresList } from '../../../hooks/use-get-stores-list';
import { useIntersection } from '@mantine/hooks';
import { Loader } from 'shared/ui/loader/loader';


export const ListStoresForConfigurationTerminals: React.FC<typeListStores> = ({ data }) => {

    const { classes } = useStyles();

    const theme = useMantineTheme();

    const [ pageNumber, setPageNumber ] = useState(0);

    const [ isPageLoading, setIsPageLoading ] = useState(false);

    const {
        storesList,
        currentPagination,
        isFetching
    } = useGetStoresList(data.storeIds, pageNumber);

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
        if (!isFetching && isPageLoading && !!storesList) {
            setIsPageLoading(false);
        }
    }, [ isFetching ]);


// ---------------------------------------------------------------------------------------------------------------------------------------

    return (
        <Box sx={ { flexGrow: 1 } } className={ classes.dataContainer }>
            <Flex className={ classes.headerWrapper }>
                <Text className={ classes.title }><Trans>Stores</Trans></Text>

            </Flex>

            <Box className={ classes.listContainer }  ref={containerRef}>
                { storesList
                    ? storesList?.length > 0
                        ? <>{
                            storesList.map((item, index) => {

                                return <Flex
                                    key={ item.id }
                                    align={ 'center' }
                                    className={ cn([ classes.listItem ]) }>
                                    <div className={ classes.marker }/>
                                    <Text truncate>{ item.name }</Text>
                                </Flex>;

                            })
                        }
                            {/* intersection target element */ }
                            { currentPagination && currentPagination.totalElements > storesList.length && <Flex justify={ 'center' } sx={ {
                                height: '25px',
                                position: 'relative',
                                marginTop: '5px'
                            } } ref={ intersectionRef }>{ isPageLoading && <Loader size={ 'sm' }/> }</Flex> }
                        </>
                        : <Flex align={ 'center' } justify={ 'center' } sx={ {
                            textAlign: 'center',
                            height: '100%',
                            backgroundColor: theme.colors.gray[0],
                        } }></Flex>
                    : <LoaderOverlay/>
                }

                { (isFetching && !isPageLoading) && <LoaderOverlay/> }
            </Box>
        </Box>
    );

};

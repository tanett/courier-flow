import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex, Text, useMantineTheme } from '@mantine/core';
import { useStyles } from './styles';
import cn from 'classnames';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { useIntersection } from '@mantine/hooks';
import { Loader } from 'shared/ui/loader/loader';
import { typeTerminalConfigurations } from '../../../../../entities/terminals-configurations/model/state-slice';
import { useGetCategoriesList } from 'features/terminal-configurations-details/hooks/use-get-categories-list';
import { typeCategoryExtended } from 'entities/category/model/types';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Trans } from '@lingui/macro';


export const ListCategoriesForConfigurationTerminals: React.FC<{ data: typeTerminalConfigurations, selectedItem: typeCategoryExtended | null, setSelectedItem: React.Dispatch<React.SetStateAction<typeCategoryExtended | null>> }> = ({
    data,
    setSelectedItem,
    selectedItem
}) => {

    const { classes } = useStyles();

    const theme = useMantineTheme();

    const [ pageNumber, setPageNumber ] = useState(0);

    const [ isPageLoading, setIsPageLoading ] = useState(false);

    const {
        categoriesList,
        currentPagination,
        isFetching
    } = useGetCategoriesList(data.productCategoryIds, pageNumber);


    const onCategoryClick = (category: typeCategoryExtended) => {
        if (category.id === selectedItem?.id) {
            setSelectedItem(null);
        } else { setSelectedItem(category);}
    };

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
        if (!isFetching && isPageLoading && !!categoriesList) {
            setIsPageLoading(false);
        }
    }, [ isFetching ]);


// ---------------------------------------------------------------------------------------------------------------------------------------

    return (

        <Box className={ classes.listContainer } ref={ containerRef }>
            { categoriesList
                ? categoriesList?.length > 0
                    ? <>{
                        categoriesList.map((item, index) => {
                            const isSelected = selectedItem?.id === item.id;
                            return <Flex
                                key={ item.id }
                                onClick={ () => onCategoryClick(item) }
                                align={ 'center' }
                                justify={ 'space-between' }
                                className={ cn([ classes.listItem, isSelected && 'selectedListItem' ]) }>
                                <Flex sx={{ gap: '10px', maxWidth: '90%', width: 'fit-content'}}><Box sx={{flexGrow: 1, overflow: 'hidden', }}><Text truncate >{ item.name }</Text></Box>
                                    <Text c={theme.colors.gray[5]}>/{item.productsCount || 0}</Text></Flex>
                                <ChevronDownIcon className={ cn(classes.chevronListItem, isSelected && 'selectedChevron') }/>
                            </Flex>;

                        })
                    }
                        {/* intersection target element */ }
                        { currentPagination && currentPagination.totalElements > categoriesList.length && <Flex justify={ 'center' } sx={ {
                            height: '25px',
                            position: 'relative',
                            marginTop: '5px'
                        } } ref={ intersectionRef }>{ isPageLoading && <Loader size={ 'sm' }/> }</Flex> }
                    </>
                    : <Flex align={ 'center' } justify={ 'center' } sx={ {
                        textAlign: 'center',
                        height: '100%',
                        backgroundColor: theme.colors.gray[0],
                    } }><Trans>There are not attached categories.</Trans></Flex>
                : <LoaderOverlay/>
            }

            { (isFetching && !isPageLoading) && <LoaderOverlay/> }
        </Box>

    );

};

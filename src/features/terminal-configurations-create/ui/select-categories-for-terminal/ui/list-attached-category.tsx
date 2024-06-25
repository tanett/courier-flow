import React from 'react';
import { typeListAttachedCategory } from '../types';
import { Box, Flex, Text, UnstyledButton, useMantineTheme } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useStyles } from 'features/terminal-configurations-create/ui/select-stores&terminals/selectors-stores-terminals/styles';
import { EmptyElement } from 'shared/ui/empty-element';
import CategoryItemInList from 'features/terminal-configurations-create/ui/select-categories-for-terminal/ui/category-item-in-list';

const ListAttachedCategory: React.FC<typeListAttachedCategory> = ({ form, }) => {

        const { i18n } = useLingui();
        const { classes } = useStyles();
        const theme = useMantineTheme();

        const onDeleteCategoryClick = (index: number) => {  form.removeListItem('productCategory', index); };

        const onResetClick = () => {form.setFieldValue('productCategory', []); };

        return (
            <Box sx={ {
                overflowX: 'hidden',
                borderLeft: `1px solid  ${ theme.colors.borderColor[0] }`,
                borderTop: `none`,
                '@media ( max-width: 1200px)': {
                    borderLeft: `none`,
                    borderTop: `1px solid  ${ theme.colors.borderColor[0] }`,
                },
                padding: '8px'
            } }>
                <Flex className={ classes.headerWrapper }>
                    <Text className={ classes.title }><Trans>Attached categories</Trans></Text>
                    <Flex direction="row" gap={ 18 } align={ 'center' } justify={ 'end' }>
                        { form.values.productCategory.length > 0 && <UnstyledButton onClick={ () => onResetClick() }
                                                                                    variant={ 'subtle' }
                                                                                    className={ classes.btnLink }
                        ><Trans>Reset</Trans></UnstyledButton> }
                    </Flex>
                </Flex>
                <Flex direction={ 'column' } gap={ 4 } className={ classes.listContainer }>
                    { form.values.productCategory.length > 0
                        ? form.values.productCategory.map((item, index) => {

                            return <CategoryItemInList
                                key={ index }
                                item={ item }
                                index={ index }
                                onDeleteCategoryClick={ onDeleteCategoryClick }

                            />;

                        })
                        : <Flex direction={ 'column' } sx={ {
                            height: '100%',
                            justifyContent: 'center'
                        } }><EmptyElement
                            withBorder={ false }
                            title1={ i18n._(t`After selecting a category, you’ll see the list here`) }
                        /></Flex>
                    }

                </Flex>

            </Box>
        )
            ;
    }
;

export default ListAttachedCategory;

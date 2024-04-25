import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Space } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ArrowLongLeftIcon } from '@heroicons/react/16/solid';
import { useStyles } from 'features/products-import/ui/select-stores/styles';
import { typeSelectStores, typeStoreListChecked } from './types';
import { SelectStoresForImportExport } from 'features/select-stores-for-import-export/select-stores-for-import-export';


export const SelectStores: React.FC<typeSelectStores> = ({
    setStep,
    options,
    setOptions,
}) => {

    const { i18n } = useLingui();

    const { classes } = useStyles();

    const [ selectedStores, setSelectedStores ] = useState<typeStoreListChecked[]>([]);

    const [ isAllChecked, setIsAllChecked ] = useState(false);

    const [ countAllStores, setCountAllStores ] = useState(0);

    const [ isError, setIsError ] = useState<string | null>(null);


    useEffect(() => {

        if (isError && (selectedStores.length !== 0 || isAllChecked)) {

            setIsError(null);

        }

    }, [ selectedStores, isAllChecked ]);


    const onNextClick = () => {

        if (selectedStores.length === 0 && !isAllChecked) {

            setIsError(i18n._(t`Select at least one store`));
            return;

        }

        setOptions({
            type: options?.type,
            stores: {
                isAllSelected: isAllChecked,
                countStores: isAllChecked ? countAllStores : selectedStores.length || 0,
                selectedStores: isAllChecked ? [] : selectedStores,
            },
        });
        setStep(2);

    };

    return (
        <Flex className={ classes.container }>
            <SelectStoresForImportExport
                selectedStores={ selectedStores }
                setSelectedStores={ setSelectedStores }
                isAllChecked={ isAllChecked }
                setIsAllChecked={ setIsAllChecked }
                setCountAllStores={ setCountAllStores }
            />

            { isError && <Box className={ classes.error }>{ isError }</Box> }
            <Space h={ 24 }/>
            <div className={ classes.btnPanel }>
                <Button
                    leftIcon={ <ArrowLongLeftIcon strokeWidth={ 0.8 }/> }
                    onClick={ () => {

                        setStep(0);
                        setOptions(null);

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

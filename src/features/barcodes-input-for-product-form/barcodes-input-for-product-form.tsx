import React, { useRef, useState } from 'react';
import { ActionIcon, Button, Flex, Input, rem, Text, useMantineTheme } from '@mantine/core';
import { Trans } from '@lingui/macro';
import { IconX } from '@tabler/icons-react';
import { typeBarcodesInputForProductForm } from 'features/barcodes-input-for-product-form/types';
import { useFocusWithin } from '@mantine/hooks';


const BarcodeItem: React.FC<{ barcode: string, onDeleteHandler: (barcode: string) => void }> = ({
    barcode,
    onDeleteHandler
}) => {

    const theme = useMantineTheme();

    return (
        <div>
            <Flex wrap={ 'nowrap' } gap={ 6 } sx={ {
                backgroundColor: theme.colors.primary[1],
                fontSize: theme.fontSizes.md,
                height: rem(27),
                lineHeight: rem(19),
                alignItems: 'center',
                padding: '4px 8px',
                borderRadius: '2px',
            } }>
                <Text p={ 0 }>{ barcode }</Text>
                <ActionIcon variant={ 'subtle' }
                            size={ 16 }
                            sx={ {
                                backgroundColor: 'white',
                                '&:hover': { color: theme.colors.gray[9] }
                            } }
                            onClick={ () => onDeleteHandler(barcode) }
                ><IconX size={ 14 }/> </ActionIcon>
            </Flex>
        </div>
    );
};

export const BarcodesInputForProductForm: React.FC<typeBarcodesInputForProductForm> = ({ form }) => {

    const theme = useMantineTheme();

    const [ value, setValue ] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);

    const {
        ref,
        focused
    } = useFocusWithin();

    const onSubmit = () => {
        if (value.trim().length > 0) {
            const isExist = form.values.barcodes.findIndex(item => item === value.trim());
            if (isExist >= 0) {
                form.setFieldError('barcodes', <Trans>This barcode already added</Trans>);
                return;
            }
            if (value.trim().length > 14) {
                form.setFieldError('barcodes', <Trans>Too long</Trans>);
                return;
            }
            form.setFieldValue('barcodes', [ ...form.values.barcodes, value.trim() ]);
            setValue('');
            inputRef.current?.focus();
        }
    };

    const onEnterInInput = (event: React.KeyboardEvent<HTMLInputElement>) => {

        if (event.code === 'Enter') {
            event.preventDefault();
            onSubmit();
        }

    };

    const onDeleteBarcodeHandler = (item: string) => {
        form.setFieldValue('barcodes', form.values.barcodes.filter(code => item !== code));
    };

    return (
        <div id={ 'barcodes' }>
            <Input.Wrapper
                id="input-barcodes"
                label={ <Trans>Barcodes</Trans> }
                sx={ {
                    '&.mantine-InputWrapper-root': {
                        maxWidth: '100%',
                        width: '100%',
                    },
                } }
            >
                <Flex wrap={ 'nowrap' } gap={ 12 }>
                    <Flex wrap={ 'wrap' } gap={ 10 } align={ 'baseline' }
                          sx={ {
                              flexGrow: 1,
                              padding: '6px',
                              border: `1px solid #DDD6FE`,
                              borderRadius: rem(4),
                              backgroundColor: 'white',
                              '&:focus, &:focus-within, &:active': {
                                  borderColor: '#3B82F6',
                                  boxShadow: `0 0 0 3px #DBEAFE`,
                              },
                          } }
                          ref={ ref }
                          onClick={ (event) => { if (!focused) { inputRef.current?.focus();}} }
                    >
                        { form.values.barcodes.map((item, index) => <BarcodeItem barcode={ item } onDeleteHandler={ onDeleteBarcodeHandler } key={ index }/>) }
                        <Input id="input-barcode"
                               value={ value }
                               ref={ inputRef }
                               onInput={ (event) => setValue(event.currentTarget.value?.trim()) }
                               onChange={ (event) => form.clearFieldError('barcodes') }
                               sx={ {
                                   flexGrow: 1,
                                   '&.mantine-Input-wrapper input': {
                                       border: 'none',
                                       boxShadow: 'none',
                                       paddingTop: 0,
                                       paddingBottom: 0,
                                       height: rem(27),
                                       minHeight: rem(27),
                                       paddingRight: rem(12),
                                       '&:focus, &:focus-within, &:active': {
                                           borderColor: 'none',
                                           boxShadow: `none`,
                                       },
                                   },

                                   minWidth: rem(50),
                                   maxWidth: rem(160)
                               } }
                               onKeyDown={ onEnterInInput }
                               maxLength={ 14 }
                        />

                    </Flex>
                    <Button variant={ 'outline' } type={ 'button' } miw={ 140 }
                            sx={ {
                                flexShrink: 0,
                                fontSize: theme.fontSizes.sm,
                                fontWeight: 700,
                                lineHeight: '19px',
                                letterSpacing: 0.3,
                                marginTop: '2px'
                            } }
                            onClick={  onSubmit }>Add barcode</Button>
                </Flex>

                <Input.Error mt={ 6 }>{ form.getInputProps('barcodes').error }</Input.Error>
            </Input.Wrapper>
        </div>
    );
};

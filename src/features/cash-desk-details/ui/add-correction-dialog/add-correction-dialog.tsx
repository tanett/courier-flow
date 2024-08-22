import { Modal } from '../../../../shared/ui/modal';
import { t, Trans } from '@lingui/macro';
import React from 'react';
import { i18n } from '@lingui/core';
import { typeAddCorrectionDialogProps } from '../../types/types';
import { useForm } from '@mantine/form';
import { type typeCorrectOperationForm, correctOperationForm } from './form';
import { Button, Flex, NumberInput, Select, Textarea } from '@mantine/core';
import { useStyles } from './styles';
import cn from 'classnames';

export const AddCorrectionDialog: React.FC<typeAddCorrectionDialogProps> = ({ onCloseDialog, onCreateCorrection }) => {

    const { classes } = useStyles();

    const form = useForm<typeCorrectOperationForm>(correctOperationForm);

    const onSetManualRefill = () => form.setValues({ type: 'MANUAL_REFILL' });
    const onSetManualWriteOff = () => form.setValues({ type: 'MANUAL_WRITE_OFF' });

    const onSubmitForm = () => {

        console.log('----', form.values);

    };

    return <Modal modalWidth="auto" opened={ true } onCloseByOverlay={ onCloseDialog }>
        <Modal.Body>
            <>
                <Modal.Header title={ i18n._(t`Create correction`) } onClose={ onCloseDialog }/>
                <Modal.Body>
                    <form onSubmit={form.onSubmit(onSubmitForm)}>
                        <Flex className={classes.container}>

                            <Flex className={classes.fieldContainer}>
                                <div className={classes.label}>
                                    <Trans>Type of correction</Trans>
                                </div>
                                <Flex className={classes.buttonContainer}>
                                    <Button onClick={onSetManualRefill} className={cn(
                                        classes.typeButton,
                                        { [ classes.typeButtonOutline ]: form.values.type !== 'MANUAL_REFILL' }
                                    )} variant={form.values.type === 'MANUAL_REFILL' ? 'filled' : 'outline' }>
                                        <Trans>Refill</Trans>
                                    </Button>
                                    <Button onClick={onSetManualWriteOff} className={cn(
                                        classes.typeButton,
                                        { [ classes.typeButtonOutline ]: form.values.type !== 'MANUAL_WRITE_OFF' }
                                    )} variant={form.values.type === 'MANUAL_WRITE_OFF' ? 'filled' : 'outline' }>
                                        <Trans>Write-off</Trans>
                                    </Button>
                                </Flex>
                            </Flex>

                            <Flex className={classes.fieldContainer}>
                                <div className={classes.label}>
                                    <Trans>Amount</Trans>
                                </div>
                                <Flex className={cn(classes.currencyContainer, { [ classes.errorCurrencyContainer ]: form.errors?.amount })}>
                                    <NumberInput
                                        className={classes.currencyInput}
                                        variant="unstyled"
                                        { ...form.getInputProps('amount') }
                                    />
                                    <Select
                                        className={classes.currencySelect}
                                        data={[ 'RUB', 'USD', 'EUR' ]}
                                        { ...form.getInputProps('currency') }
                                    />
                                </Flex>
                                {form.errors?.amount && <div className={classes.errorMessage}>{form.errors.amount}</div>}
                            </Flex>

                            <Flex className={cn(classes.fieldContainer, classes.textAreaContainer)}>
                                <div className={classes.label}>
                                    <Trans>Comment</Trans>
                                </div>
                                <div>
                                    <Textarea
                                        autosize
                                        minRows={3}
                                        maxLength={250}
                                        placeholder={i18n._(t`Type the reason of correction`)}
                                        { ...form.getInputProps('comment') }
                                    />
                                    <Flex className={classes.textAreaSymbolCount}>{form.values.comment?.length ?? 0} / 250</Flex>
                                </div>
                            </Flex>

                            <Flex className={classes.submitButtonContainer}>
                                <Button type="button" variant="outline" onClick={onCloseDialog}>
                                    <Trans>Cancel</Trans>
                                </Button>
                                <Button type="submit">
                                    <Trans>Create</Trans>
                                </Button>
                            </Flex>

                        </Flex>
                    </form>
                </Modal.Body>
            </>
        </Modal.Body>
    </Modal>;

};

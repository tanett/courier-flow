import { Modal } from '../../../../shared/ui/modal';
import { t, Trans } from '@lingui/macro';
import React, { useEffect } from 'react';
import { i18n } from '@lingui/core';
import { typeAddCorrectionDialogProps } from '../../types/types';
import { useForm } from '@mantine/form';
import { type typeCorrectOperationForm, correctOperationForm } from './form';
import { Button, Flex, NumberInput, Select, Textarea } from '@mantine/core';
import { useStyles } from './styles';
import cn from 'classnames';
import { makeSelectList } from '../../../../shared/utils/curremcy-utils';
import { IconChevronDown } from '@tabler/icons-react';
import { useAppDispatchT, useSelectorT } from 'app/state';
import { useCreateCashDeskOperationMutation } from '../../../../entities/cash-desk-operations/api/api';
import { typeCreateCashDeskOperationData } from '../../../../entities/cash-desk-operations/model/types';
import { errorHandler } from '../../../../app/utils/errorHandler';
import { typeResponseError } from '../../../../app/api/types';

export const AddCorrectionDialog: React.FC<typeAddCorrectionDialogProps> = ({ onCloseDialog, storeId, cashDeskId }) => {

    const { classes } = useStyles();

    const dispatchAppT = useAppDispatchT();

    const form = useForm<typeCorrectOperationForm>(correctOperationForm);

    const stateCurrencyList = useSelectorT(state => state.merchantCurrency.currencyList);
    const defaultCurrency = useSelectorT(state => state.merchantCurrency.baseCurrency);
    const merchantId = useSelectorT(state => state.userProfile.userProfile?.actor.merchantId);

    const onSetManualRefill = () => form.setValues({ type: 'MANUAL_REFILL' });
    const onSetManualWriteOff = () => form.setValues({ type: 'MANUAL_WRITE_OFF' });

    const [ createCashDeskOperation, { isLoading: isCreateCashDeskOperationLoading } ] = useCreateCashDeskOperationMutation();

    useEffect(() => {

        if (defaultCurrency) form.setFieldValue('currency', defaultCurrency);

    }, [ defaultCurrency ]);

    const onSubmitForm = async () => {

        if (!merchantId || !storeId || !cashDeskId) return;

        const requestData: typeCreateCashDeskOperationData = {
            merchantId: merchantId,
            storeId: storeId,
            cashDeskId: cashDeskId,
            type: form.values.type,
            comment: form.values.comment.trim().length > 0 ? form.values.comment.trim() : undefined,
            currency: form.values.currency,
            amount: form.values.amount,
        };

        try {

            await createCashDeskOperation(requestData).unwrap();
            onCloseDialog();

        } catch (err) {

            errorHandler(err as typeResponseError, 'createCashDeskOperation', dispatchAppT);

        }

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
                                        data={makeSelectList(stateCurrencyList)}
                                        { ...form.getInputProps('currency') }
                                        rightSection={ <IconChevronDown size="1rem"/> }
                                        styles={ {
                                            rightSection: {
                                                pointerEvents: 'none',
                                                pointer: 'pointer',
                                            },
                                        } }
                                        sx={ theme => ({
                                            '&.mantine-Select-root div[aria-expanded=true] .mantine-Select-rightSection': { transform: 'rotate(180deg)' },
                                            '& input::placeholder': { color: theme.colors.gray[ 3 ] },
                                        }) }
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
                                <Button type="submit" disabled={isCreateCashDeskOperationLoading}>
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

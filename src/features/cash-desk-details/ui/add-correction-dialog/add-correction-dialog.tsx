import { Modal } from '../../../../shared/ui/modal';
import { t } from '@lingui/macro';
import React from 'react';
import { i18n } from '@lingui/core';
import { typeAddCorrectionDialogProps } from '../../types/types';
import { useForm } from '@mantine/form';
import { type typeCorrectOperationForm, correctOperationForm } from './form';

export const AddCorrectionDialog: React.FC<typeAddCorrectionDialogProps> = ({ onCloseDialog, onCreateCorrection }) => {

    const form = useForm<typeCorrectOperationForm>(correctOperationForm);

    const onSubmit = () => {

        onCreateCorrection();

    };

    return <Modal modalWidth="auto" opened={ true } onCloseByOverlay={ onCloseDialog }>
        <Modal.Body>
            <>
                <Modal.Header title={ i18n._(t`Create correction`) } onClose={ onCloseDialog }/>
                <Modal.Body>
                    <form onSubmit={form.onSubmit(onSubmit)}>
                        {/* <Box
                            sx={{
                                width: rem(550),
                                [ `@media (max-width: ${em(1000)})` ]: { minWidth: '50vw', width: 'fit-content' },
                                padding: rem(15),
                                marginTop: rem(-10),
                                position: 'relative',
                                overflow: 'visible',
                                '& .mantine-InputWrapper-root': { maxWidth: 'none' },
                            }}>
                            <SelectorWithSearchUsers
                                form={form as unknown as typeReturnForm}
                                fieldName={'userId'}
                                required={true}
                                initialValue={null}
                                label={i18n._(t`Employees`)}
                                placeholder={i18n._(t`Search by employee name`)}
                            />
                            <Space h={32}/>
                            <Flex sx={{
                                gap: rem(24),
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                '& .mantine-Button-root': {
                                    minWidth: rem(165),
                                    fontSize: theme.fontSizes.md,
                                    fontWeight: 700,
                                },
                            }}>
                                <Button key="cancel" type="reset" variant="outline"
                                    onClick={onCancelClick}>{t`Cancel`}</Button>
                                <Button key="submit" disabled={!!Object.values(form.errors).length || isInProgress}
                                    type="submit">{t`Add`}</Button>
                            </Flex>
                        </Box>
                         {isEditUserLoading && <LoaderOverlay/>}*/}
                    </form>
                </Modal.Body>
            </>
        </Modal.Body>
    </Modal>;

};

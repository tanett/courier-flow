import React, { useState } from 'react';
import { ActionIcon, Button, Flex, rem, useMantineTheme } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useStyles } from './styles';
import { useLingui } from '@lingui/react';
import { ReceiptIcon } from 'shared/images/icons/receipt';
import { Modal } from 'shared/ui/modal';

export const PrintReceiptButton: React.FC<{ id: string | undefined }> = ({ id }) => {

    const { classes } = useStyles();

    const theme = useMantineTheme()

    const { i18n } = useLingui();

    const [ isOpenReceipt, setOpenReceipt ] = useState(false);


    return (
        <>
            <ActionIcon variant="outline"
                        onClick={() => setOpenReceipt(true) }
                        className={classes.button}
            >
                <ReceiptIcon color={theme.colors.gray[5]} width={22} height={22}/>
            </ActionIcon>

            { isOpenReceipt && <Modal modalWidth="dialog" opened={ true } onCloseByOverlay={()=>setOpenReceipt(false)}>
                <Modal.Body>
                    <Modal.Header title={i18n._(t`Receipt`)} onClose={()=>setOpenReceipt(false)}/>
                    <Modal.Body>
                        receipt
                        <Flex sx = {{
                            alignItems: 'center',
                            gap: rem(24),
                            justifyContent: 'center',
                        }}>
                            <Button variant='outline' onClick={()=>setOpenReceipt(false)}><Trans>Close</Trans></Button>
                            <Button><Trans>Print</Trans></Button>
                        </Flex>
                    </Modal.Body>
                </Modal.Body>
            </Modal> }

        </>
    );

};

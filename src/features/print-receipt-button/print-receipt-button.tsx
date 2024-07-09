import React, { useState } from 'react';
import { ActionIcon, Button, Flex, rem, useMantineTheme } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useStyles } from './styles';
import { useLingui } from '@lingui/react';
import { ReceiptIcon } from 'shared/images/icons/receipt';
import { Modal } from 'shared/ui/modal';
import { ModalPrintReceiptSale } from 'features/modal-print-sale-receipt/modal-print-receipt';

export const PrintReceiptButton: React.FC<{ id: string | undefined }> = ({ id }) => {

    const { classes } = useStyles();

    const theme = useMantineTheme()

    const [ isOpenReceipt, setOpenReceipt ] = useState<string | null>(null);


    return (
        <>
            <ActionIcon variant="outline"
                        onClick={() => setOpenReceipt(id || null) }
                        className={classes.button}
            >
                <ReceiptIcon color={theme.colors.primary[5]} width={22} height={22}/>
            </ActionIcon>

            { id && isOpenReceipt && <ModalPrintReceiptSale setOpen={setOpenReceipt} id={id} />  }

        </>
    );

};

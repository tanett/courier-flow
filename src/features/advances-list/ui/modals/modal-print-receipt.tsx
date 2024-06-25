import React from 'react';
import { useLingui } from '@lingui/react';
import { Modal } from 'shared/ui/modal';
import { t, Trans } from '@lingui/macro';
import { Button, Flex, rem } from '@mantine/core';

export const ModalPrintReceiptAdvance: React.FC<{
    setOpen: React.Dispatch<React.SetStateAction< string | number| null>>,
    id: string | number
}> = ({
    setOpen,
    id,
}) => {

    const { i18n } = useLingui();


    return (
        <Modal modalWidth="dialog" opened={ true } onCloseByOverlay={()=>setOpen(null)}>
            <Modal.Body>
                <Modal.Header title={i18n._(t`Receipt`)} onClose={()=>setOpen(null)}/>
                <Modal.Body>
                    receipt  - id advance = {id}
                    <Flex sx = {{
                        alignItems: 'center',
                        gap: rem(24),
                        justifyContent: 'center',
                    }}>
                        <Button variant='outline' onClick={()=>setOpen(null)}><Trans>Close</Trans></Button>
                        <Button><Trans>Print</Trans></Button>
                    </Flex>
                </Modal.Body>
            </Modal.Body>
        </Modal>
    );

};

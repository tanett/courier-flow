import React, { useState } from 'react';
import { useLingui } from '@lingui/react';
import { Modal } from 'shared/ui/modal';
import { t, Trans } from '@lingui/macro';
import { Button, Flex, Loader, rem } from '@mantine/core';
import { useGetSaleReceiptByIdQuery } from '../../../../entities/sales/api/api';
import { PdfViewer } from 'shared/ui/pdf-viewer/pdf-viewer';


export const ModalPrintReceiptSale: React.FC<{
    setOpen: React.Dispatch<React.SetStateAction<string | null>>,
    id: string
}> = ({
    setOpen,
    id,
}) => {

    const { i18n } = useLingui();

    const {
        data,
        isFetching
    } = useGetSaleReceiptByIdQuery(id);


    const onPrintHelper = () => {window.print();};


    return (
        <Modal modalWidth="auto" opened={ true } onCloseByOverlay={ () => setOpen(null) } centered={true}>
            <Modal.Body>
                <Modal.Header title={ i18n._(t`Receipt`) } onClose={ () => setOpen(null) }/>
                <Modal.Body>

                    <Flex justify="center" align="center" direction="column" sx={ { minHeight: '100px' } }>
                        { data && <PdfViewer pdf={ data }/> }
                        { isFetching && <Loader size={ 'sm' }/> }
                    </Flex>

                    <Flex sx={ {
                        alignItems: 'center',
                        gap: rem(24),
                        justifyContent: 'center',
                    } }>
                        <Button variant="outline" onClick={ () => setOpen(null) }><Trans>Close</Trans></Button>
                        <Button onClick={ onPrintHelper }><Trans>Print</Trans></Button>
                    </Flex>
                </Modal.Body>
            </Modal.Body>
        </Modal>
    );

};

import React, { useState } from 'react';
import { useLingui } from '@lingui/react';
import { Modal } from 'shared/ui/modal';
import { t, Trans } from '@lingui/macro';
import { Button, Flex, Loader, rem, useMantineTheme } from '@mantine/core';
import { useGetSaleReceiptByIdQuery } from '../../../../entities/sales/api/api';
import { PdfViewer } from 'shared/ui/pdf-viewer/pdf-viewer';
import { IconPrinter } from '@tabler/icons-react';
import { ModalFixedButton } from 'shared/ui/modal/ui/modal-fixed-button/modal-fixed-button';
import { LoaderOverlay } from 'shared/ui/loader-overlay';


export const ModalPrintReceiptSale: React.FC<{
    setOpen: React.Dispatch<React.SetStateAction<string | null>>,
    id: string
}> = ({
    setOpen,
    id,
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const {
        data,
        isFetching
    } = useGetSaleReceiptByIdQuery(id);


    const onPrintHelper = () => {window.print();};


    return (
        <Modal modalWidth="auto"
               opened={ true }
               onCloseByOverlay={ () => setOpen(null) }
               centered={ true }
               fixedButton={  <ModalFixedButton onClick={ onPrintHelper } onClose={()=>setOpen(null)}  icon={<IconPrinter size={ 24 }/>} label={i18n._(t`Print`)}/> }
             >
            <Modal.Body>

                <Modal.Header title={ i18n._(t`Receipt`) } onClose={ () => setOpen(null) }/>
                <Modal.Body>

                    <Flex justify="center" align="center" direction="column" sx={ {
                        minHeight: '65vh',
                        minWidth: '400px'
                    } }>
                        { data && <PdfViewer pdf={ data }/> }
                    </Flex>
                </Modal.Body>
            </Modal.Body>
        </Modal>
    );

};

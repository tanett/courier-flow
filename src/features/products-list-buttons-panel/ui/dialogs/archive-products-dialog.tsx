import { dialogIcon } from '../../../../shared/ui/dialog-new/types';
import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import { Dialog } from '../../../../shared/ui/dialog-new';
import React from 'react';
import { typeArchiveProductsDialogProps } from '../../types/type';

export const ArchiveProductsDialog: React.FC<typeArchiveProductsDialogProps> = ({ onCancel }) => {


    return (
        <Dialog
            icon={dialogIcon.none}
            withoutPadding={true}
            cancelButton={{
                title: i18n._(t`Cancel`),
                handler: onCancel,
            }}
            confirmButton={{
                title: i18n._(t`Archive`),
                handler: console.log,
            }}
        >


            {/* {attachedFilesErrors && <Alert className={classes.alertWrapper} color="red" svg-custom-icons={<ExclamationTriangleIcon/>}> */}
            {/*     <Flex className={classes.alertMessage}>{attachedFilesErrors?.map(item => <div key={item} className={classes.alertMessage}>{item}</div>)}</Flex> */}
            {/* </Alert>} */}

        </Dialog>
    );

};

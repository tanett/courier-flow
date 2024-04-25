import React from 'react';
import { processSteps, useExportProducts } from 'features/products-export/hooks/use-export-products';
import { useLazyDownloadExportFileByIdQuery } from '../../../../entities/exports/api/api';
import { Dialog } from 'shared/ui/dialog-new';
import { dialogIcon } from 'shared/ui/dialog-new/types';
import { FileLoader } from 'shared/ui/file-loader';
import { DownloadFileButtonsPanel } from 'shared/ui/download-file-buttons-panel';
import { typeExportProductsDialog } from 'features/products-export/ui/export-product-dialog/types';
import { ImportFileDialogMessage } from 'shared/ui/import-file-dialog-message';
import { t, Trans } from '@lingui/macro';
import { Box } from '@mantine/core';
import { ImportFileDialogErrorListForValidationError } from 'shared/ui/import-file-dialog-error-list-for-validation-error';
import { useLingui } from '@lingui/react';


export const ExportProductsDialog: React.FC<typeExportProductsDialog> = ({
    options,
    productIds,
}) => {

    const { i18n } = useLingui();

    const {
        downloadFileId,
        processStep,
        importProcessRange,
        errorInfo,
    } = useExportProducts(options, productIds);

    const [ onDownloadFile, { isFetching } ] = useLazyDownloadExportFileByIdQuery();

    if (processStep === processSteps.preparing || processStep === processSteps.inQueue || processStep === processSteps.inProgress || processStep === processSteps.done) {

        return (
            <Dialog
                icon={ dialogIcon.none }
                withoutPadding={ true }
            >
                <FileLoader
                    loaderRange={ importProcessRange }
                />
                <DownloadFileButtonsPanel
                    fileId={ downloadFileId }
                    onDownloadFile={ onDownloadFile }
                    isReadyToDownload={ processStep === processSteps.done }
                    isFileLoading={ isFetching }
                />
            </Dialog>
        );

    }

    if (processStep === 'error') {

        console.log('-----', errorInfo);
        return (
            <Dialog
                icon={dialogIcon.error}
                withoutPadding={true}
                withScroll={!!(errorInfo && typeof errorInfo.data === 'object' && errorInfo.data?.validationErrors && errorInfo.data?.validationErrors.length > 0)}
                withMarginTopFat={true}
            >
                <ImportFileDialogMessage isWide title={i18n._(t`Export error`)}>
                    <Box>
                        <Trans>File processing completed with errors. Correct your selection and download it again.</Trans>
                    </Box>
                    {(errorInfo?.data && typeof errorInfo.data === 'string') && <Box>{
                        errorInfo.data?.split('\n').map((item, index) => <div key={index}>{item}</div>) }
                    </Box>}
                    {(errorInfo?.data && typeof errorInfo.data === 'object' && errorInfo.data.errorMessage) && <Box>{
                        errorInfo.data?.errorMessage.split('\n').map((item, index) => <div key={index}>{item}</div>) }
                    </Box>}
                    {(errorInfo?.data && typeof errorInfo.data === 'object' && errorInfo.data.validationErrors?.length) && <ImportFileDialogErrorListForValidationError errorList={errorInfo.data.validationErrors} />}
                </ImportFileDialogMessage>
            </Dialog>
        );

    }

    return null;

};

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
import { Box, useMantineTheme } from '@mantine/core';
import { ImportFileDialogErrorListForValidationError } from 'shared/ui/import-file-dialog-error-list-for-validation-error';
import { useLingui } from '@lingui/react';


export const ExportProductsDialog: React.FC<typeExportProductsDialog> = ({
    options,
    productIds,
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const {
        downloadFileId,
        processStep,
        importProcessRange,
        errorInfo,
        downloadFileName
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
                    downloadFileName={downloadFileName}
                />
            </Dialog>
        );

    }

    if (processStep === 'error') {

        return (
            <Dialog
                icon={ dialogIcon.error }
                withoutPadding={ true }
                withScroll={ !!(errorInfo && typeof errorInfo.data === 'object' && errorInfo.data?.validationErrors && errorInfo.data?.validationErrors.length > 0) }
                withMarginTopFat={ true }
            >
                <ImportFileDialogMessage isWide title={ i18n._(t`Export error`) }>
                    <Box sx={ { color: theme.colors.gray[5] } }>
                        <Trans>File processing completed with errors. Correct your selection and download it again.</Trans>
                    </Box>
                    { (errorInfo?.data && typeof errorInfo.data === 'string') &&
                        <Box sx={{marginTop: '10px', textAlign: 'left'}}>{
                        errorInfo.data?.split('\n').map((item, index) => <div key={ index }>{ index+1}. { item }</div>) }
                    </Box>
                    }
                    { (errorInfo?.data && typeof errorInfo.data === 'object' && errorInfo.data.errorMessage) && <Box  sx={{marginTop: '10px', textAlign: 'left'}}>{
                        errorInfo.data?.errorMessage.split('\n').map((item, index) => <div key={ index }>{ index+1}. { item }</div>) }
                    </Box> }
                    { (errorInfo?.data && typeof errorInfo.data === 'object' && errorInfo.data.validationErrors?.length) && <ImportFileDialogErrorListForValidationError errorList={ errorInfo.data.validationErrors }/> }
                </ImportFileDialogMessage>
            </Dialog>
        );

    }

    return null;

};

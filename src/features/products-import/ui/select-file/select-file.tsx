import React from 'react';
import { Alert, Box, Button, Flex, Space, Text } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t, Trans } from '@lingui/macro';
import { ArrowLongLeftIcon, ExclamationTriangleIcon } from '@heroicons/react/16/solid';
import { useStyles } from './styles';
import { typeSelectFile } from './types';
import { getTranslatedTypeForImports } from '../../../../entities/products/helpers/get-translated-variant-for-import';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useImportProductsFile } from 'features/products-import/hooks/use-import-products-file';
import { dialogIcon } from 'shared/ui/dialog-new/types';
import { FileLoader } from 'shared/ui/file-loader';
import { ImportFileDialogMessage } from 'shared/ui/import-file-dialog-message';
import { ImportFileDialogErrorList } from 'shared/ui/import-file-dialog-error-list';
import { DragDropFileUpload } from 'shared/ui/drag-drop-file-upload';
import { MIME_TYPES } from '@mantine/dropzone';
import { Dialog } from 'shared/ui/dialog-new';
import { PRODUCT_IMPORT_TYPE_REQUEST } from '../../../../entities/products/api/types';
import { ImportFileDialogErrorListForValidationError } from 'shared/ui/import-file-dialog-error-list-for-validation-error';


export const SelectFile: React.FC<typeSelectFile> = ({
    setStep,
    importOptions,
   // setRefetch
}) => {

    const { i18n } = useLingui();
    const { classes } = useStyles();
    const maxFileSize = 10 * 1024 * 1024;
    const acceptedFormats = [ MIME_TYPES.xlsx, MIME_TYPES.xls ];

    const {
        attachedFile,
        attachedFilesErrors,
        onFileAttach,
        onFileAttachReject,
        onSendFile,
        isUploadingFile,
        processStep,
        importProcessRange,
        importErrorList,
        responseFullError
    } =useImportProductsFile()

    const onImportClick = () => {
        const storeIds = importOptions.options
            ? importOptions.options.isAllSelected ? []: importOptions.options.selectedStores.map(item=>item.id)
            : []
        onSendFile(importOptions.importType, storeIds).then()
    };


    if (processStep === 'attach') {

        return (
            <Flex className={ classes.container }>
                <Alert icon={ <InformationCircleIcon /> } className={classes.alert}>
                    <Text ><Trans>Selected import option</Trans>:&nbsp;<b>{ getTranslatedTypeForImports(importOptions.importType) }</b></Text>
                    { importOptions.importType === PRODUCT_IMPORT_TYPE_REQUEST.RETAIL_PRODUCT_FROM_FILTER && <Text><Trans>Number of selected stores</Trans>:&nbsp; <b>{ importOptions.options?.countStores || '' }</b></Text> }
                </Alert>
                <Space h={ 12 }/>
                <DragDropFileUpload
                    isLoading={isUploadingFile}
                    attachedFile={attachedFile}
                    onFileAttach={onFileAttach}
                    onFileAttachReject={onFileAttachReject}
                    acceptedFileFormats={acceptedFormats}
                    maxFileSize={maxFileSize}
                    dropZoneMessage={<Trans>Attach or drag an XLSX file<br/>no larger than 10Mb into this area</Trans>}
                />

                {attachedFilesErrors && <Alert className={classes.alertWrapper} color="red" icon={<ExclamationTriangleIcon/>}>
                    <Flex className={classes.alertMessage}>{attachedFilesErrors?.map(item => <div key={item} className={classes.alertMessage}>{item}</div>)}</Flex>
                </Alert>}

                <Space h={ 24 }/>
                <div className={ classes.btnPanel }>
                    <Button
                        leftIcon={ <ArrowLongLeftIcon strokeWidth={ 0.8 }/> }
                        onClick={ () => {setStep(importOptions.options ? 1 : 0); } }
                        variant={ 'outline' }
                        className={ classes.button }
                    >
                        <Trans>Come back</Trans></Button>
                    <Button
                        onClick={ onImportClick }
                        variant={ 'filled' }
                        className={ classes.button }
                        disabled={!attachedFile|| !!importErrorList}
                    >
                        <Trans>Import</Trans></Button>
                </div>
            </Flex>
        );

    }

    if (processStep === 'loading') {

        return (
            <Dialog
                icon={dialogIcon.none}
                withoutPadding={true}
            >
                <FileLoader
                    loaderRange={importProcessRange}
                />
            </Dialog>
        );

    }

    if (processStep === 'done') {

        return (
            <Dialog
                icon={dialogIcon.success}
                withoutPadding={true}
                withMarginTopFat={true}
            >
                <ImportFileDialogMessage title={i18n._(t`Products imported successfully`)}>
                    <Box>
                        <Trans>All products listed in the file are successfully imported.</Trans>
                    </Box>
                </ImportFileDialogMessage>
            </Dialog>
        );

    }

    if (processStep === 'error') {

        return (
            <Dialog
                icon={dialogIcon.error}
                withoutPadding={true}
                withScroll={!!(importErrorList && importErrorList.length > 2)}
                withMarginTopFat={true}
            >
                <ImportFileDialogMessage isWide title={i18n._(t`Import error`)}>
                    <Box>
                        <Trans>File processing completed with errors. Correct the file and upload it again.</Trans>
                    </Box>
                    {(!importErrorList && responseFullError?.errorMessage)  && <Box>{
                        responseFullError?.errorMessage?.split('\n').map((item, index)=><div key={index}>{item}</div>) }
                    </Box>}
                    {(!importErrorList && responseFullError?.validationErrors?.length)  && <ImportFileDialogErrorListForValidationError errorList={responseFullError.validationErrors} />}
                    {importErrorList?.length && <ImportFileDialogErrorList errorList={importErrorList}/>}
                </ImportFileDialogMessage>
            </Dialog>
        );

    }

    return null;

};

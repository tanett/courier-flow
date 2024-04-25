import React, { useEffect, useState } from 'react';
import { type FileRejection, type FileWithPath } from '@mantine/dropzone';
import { t } from '@lingui/macro';
import { typeErrorData, typeImportErrorResponse, typeResponseError } from '../../../app/api/types';
import { errorHandler } from '../../../app/utils/errorHandler';
import { i18n } from '@lingui/core';
import { useAppDispatchT } from '../../../app/state';
import { importFileStatuses, typeImportError } from '../../../entities/imports/api/types';
import { REFETCH_INTERVAL } from '../../../app/config/api-constants';
import { useLazyGetImportByIdQuery } from '../../../entities/imports/api/api';
import { useImportProductFileMutation } from '../../../entities/products/api/api';
import { PRODUCT_IMPORT_TYPE_REQUEST, typeImportProductRequestData } from '../../../entities/products/api/types';
import { useProductsListRefetch } from '../../../entities/products/hooks/use-products-list-refetch';

export const useImportProductsFile = () => {

    const dispatchAppT = useAppDispatchT();

    const [ attachedFile, setAttachedFile ] = useState<File | null>(null);

    const [ attachedFilesErrors, setAttachedFilesErrors ] = useState<null | string[]>(null);

    const [ isUploadingFile, setIsUploadingFile ] = React.useState(false);

    const [ importProcessRange, setImportProcessRange ] = useState<number>(0);

    const [ processStep, setProcessStep ] = React.useState<'attach' | 'loading' | 'error' | 'done'>('attach');

    const [ importedFileId, setImportedFileId ] = useState<string | null>(null);

    const [ importErrorList, setImportErrorList ] = useState<typeImportError[] | null>(null);
    const [ responseFullError, setResponseFullError ] = useState<typeErrorData| null>(null);

    const { productsListRefetch } = useProductsListRefetch();

    const [ sendFile ] = useImportProductFileMutation();

    const [ getImportById ] = useLazyGetImportByIdQuery();


    // Get import by id handler
    const refetchGetImportById = async (importedFileId: string) => {

        if (importedFileId) {

            try {

                const response = await getImportById(importedFileId).unwrap();

                if (response.status.code === importFileStatuses.DONE) {

                    setTimeout(() => setProcessStep('done'), 500);
                    setImportProcessRange(100);

                    productsListRefetch();

                }
                if (response.status.code === importFileStatuses.ERROR) {

                    setProcessStep('error');
                    setImportErrorList(response.errors);

                }

            } catch (err) {

                errorHandler(err as typeResponseError, 'refetchGetImportById', dispatchAppT);
                setImportedFileId(null);

            }

        }

    };


    // Set counter and check imported file
    useEffect(() => {

        let intervalId: NodeJS.Timer | undefined;

        if (importedFileId) {

            intervalId = setInterval(() => {

                refetchGetImportById(importedFileId).then();

            }, REFETCH_INTERVAL);

        }

        if (processStep === 'done' || processStep === 'error') clearInterval(intervalId);

        return () => clearInterval(intervalId);

    }, [ importedFileId, processStep ]);


    // Errors of attached files state
    useEffect(() => {

        if (attachedFilesErrors) setAttachedFilesErrors(attachedFilesErrors);

    }, [ attachedFilesErrors ]);

    // Clear errors of attached files state
    useEffect(() => {

        if (attachedFile) setAttachedFilesErrors(null);

    }, [ attachedFile ]);


    // On attach file handler
    const onFileAttach = (files: FileWithPath[]): void => {

        if (files.length === 1) {

            setAttachedFilesErrors(null);
            setAttachedFile(files[ 0 ]);

        } else {

            setAttachedFile(null);

        }

    };


    // On attach file reject handler
    const onFileAttachReject = (files: FileRejection[]): void => {

        const errorList: string[] = [];

        if (files.length > 1) errorList.push(t`Only one file can be attached.`);

        if (files[ 0 ].errors[ 0 ].code === 'file-too-large') errorList.push(t`The maximum file size has been exceeded. Please select another file.`);
        if (files[ 0 ].errors[ 0 ].code === 'file-invalid-type') errorList.push(t`Wrong file type. Please select another file.`);

        if (errorList.length) {

            setAttachedFilesErrors(errorList);

        } else {

            setAttachedFilesErrors(null);

        }

        setAttachedFile(null);

    };


    // On send file to server handler
    const onSendFile = async (type: PRODUCT_IMPORT_TYPE_REQUEST, storeIds: string[]) => {

        if (attachedFile) {

            const requestData: typeImportProductRequestData = { importType: type };

            if (type === PRODUCT_IMPORT_TYPE_REQUEST.RETAIL_PRODUCT_FROM_FILTER) {

                requestData.storeIds = storeIds;

            }

            const formData = new FormData();
            formData.append('file', attachedFile);
            formData.append('request', JSON.stringify(requestData));

            setIsUploadingFile(true);

            try {

                const response = await sendFile(formData).unwrap();
                if (response.status.code === importFileStatuses.IN_QUEUE || response.status.code === importFileStatuses.IN_PROGRESS || response.status.code === importFileStatuses.DONE) {

                    setProcessStep('loading');
                    setImportedFileId(response.id);

                }

            } catch (err) {

                if ((err as typeImportErrorResponse).status === 400) {

                    setProcessStep('error');
                    setResponseFullError((err as typeImportErrorResponse).data || null);

                }
                errorHandler(err as typeResponseError, 'sendFile', dispatchAppT);

            }

            setIsUploadingFile(false);

        } else {

            setAttachedFilesErrors([ i18n._(t`You didn't attach the file`) ]);

        }

    };

    return {
        attachedFile,
        attachedFilesErrors,
        onFileAttach,
        onFileAttachReject,
        onSendFile,
        isUploadingFile,
        processStep,
        importProcessRange,
        importErrorList,
        responseFullError,
    };

};

import { useState } from 'react';
import { type FileRejection, type FileWithPath } from '@mantine/dropzone';
import { t } from '@lingui/macro';

export const useBlockTerminalsByFile = () => {

    const [ attachedFile, setAttachedFile ] = useState<File | null>(null);

    const [ attachedFilesErrors, setAttachedFilesErrors ] = useState<null | string[]>(null);

    const onFileAttach = (files: FileWithPath[]): void => {

        if (files.length === 1) {

            setAttachedFilesErrors(null);
            setAttachedFile(files[ 0 ]);

        } else {

            setAttachedFile(null);

        }

    };

    const onFileAttachReject = (files: FileRejection[]): void => {

        const errorList: string[] = [];

        if (files.length > 1) errorList.push(t`Only one file can be attached.`);

        if (files[ 0 ].errors[ 0 ].code === 'file-too-large') errorList.push(t`The maximum file size has been exceeded. Please select another file.`);
        if (files[ 0 ].errors[ 0 ].code === 'file-invalid-type') errorList.push(t`Wrong file type. Please select another file.`);

        if (errorList.length) setAttachedFilesErrors(errorList);
        else setAttachedFilesErrors(null);

        setAttachedFile(null);

    };

    return {
        attachedFile,
        attachedFilesErrors,
        onFileAttach,
        onFileAttachReject,
    };

};

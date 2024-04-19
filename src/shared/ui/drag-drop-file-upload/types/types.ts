import { TransProps } from '@lingui/react';
import type { FileRejection, FileWithPath } from '@mantine/dropzone';
import React from 'react';

export interface typeDragDropFileUploadProps{
    isLoading?: boolean
    maxFileSize?: number
    attachedFile: File | null
    onFileAttach: (files: FileWithPath[]) => void
    onFileAttachReject?: (files: FileRejection[]) => void
    acceptedFileFormats?: string[]
    dropZoneMessage: React.ReactElement<TransProps>
}

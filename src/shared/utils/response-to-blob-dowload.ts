import { getFilenameFromContentDispositionHeader } from './get-filename-from-content-disposition-header';

export enum expectedFileType {
    xlsx= '.xlsx',
    xls= '.xls',
}

export const responseToBlobDownload = async (response: Response, expectedFileType: expectedFileType) => {

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = getFilenameFromContentDispositionHeader(response) ?? Date.now().toString() + expectedFileType;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

};

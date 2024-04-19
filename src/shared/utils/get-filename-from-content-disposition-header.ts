
export const getFilenameFromContentDispositionHeader = (response: Response) => {

    const contentDispositionValue = response.headers.get('content-disposition');

    const filenameRegex = /filename="=\?UTF-8\?Q\?(.*?)\?=";/;
    const filenameRegexRu = /^.*filename[^;=\n]*=UTF-8''((.*?\\2|[^;\n]*)[\n;]?$)/i;


    const filename = (contentDispositionValue ?? '').match(filenameRegex);
    const filenameRu = (contentDispositionValue ?? '').match(filenameRegexRu);

    if(filenameRu && filenameRu[2]) {return decodeURIComponent(filenameRu[2])}

    if (!filename || filename.length < 2) return undefined;

    return filename[ 1 ];

};

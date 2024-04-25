export const getFilenameFromContentDispositionHeader = (response: Response) => {

    const contentDispositionValue = response.headers.get('content-disposition');

    const filenameRegex = /filename="=\?UTF-8\?Q\?(.*?)\?=";/;
    const filenameRegexRu = /^.*filename[^;=\n]*=UTF-8''((.*?\\2|[^;\n]*)[\n;]?$)/i;

    const defaultRegex = /filename="(.*?)(\..+)"/;


    const filename = (contentDispositionValue ?? '').match(filenameRegex);
    const filenameRu = (contentDispositionValue ?? '').match(filenameRegexRu);
    const defaultName = (contentDispositionValue ?? '').match(defaultRegex);

    if (filenameRu && filenameRu[ 2 ]) {

        return decodeURIComponent(filenameRu[ 2 ]);

    }
    if (filename && filename[ 1 ]) {

        return decodeURIComponent(filename[ 1 ]);

    }
    if (defaultName && defaultName[ 1 ]) {

        return decodeURIComponent(defaultName[ 1 ] + defaultName[ 2 ].toLowerCase());

    }

    return undefined;

};

import React, { useState } from 'react';
import { Box, rem } from '@mantine/core';
import { Page, Document, pdfjs } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { LoaderOverlay } from 'shared/ui/loader-overlay';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const maxWidth = 400;

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};
export const PdfViewer: React.FC<{ pdf: Blob | undefined }> = ({ pdf }) => {

    const [ numPages, setNumPages ] = useState<number | null>(null);


    function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
        setNumPages(1);
    }


    return (
        <Box sx={ {  minWidth: rem(maxWidth) } }>
            <Document
                file={ pdf }
                onLoadSuccess={ onDocumentLoadSuccess }
                options={ options }
                loading={ <LoaderOverlay/> }
            >
                { Array.from(new Array(numPages), (el, index) => (
                    <Page
                        key={ `page_${ index + 1 }` }
                        pageNumber={ index + 1 }
                        width={ maxWidth }
                    />
                )) }

            </Document>
        </Box>
    );

};

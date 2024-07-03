import React, { useState } from 'react';
import { Loader } from '@mantine/core';
import { Page, Document, pdfjs } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
};
export const PdfViewer: React.FC<{ pdf:  Blob | undefined }> = ({ pdf }) => {

    const [ numPages, setNumPages ] = useState<number | null>(null);

    function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
        setNumPages(1);
    }


    return (
        <Document
            file={ pdf }
            onLoadSuccess={ onDocumentLoadSuccess }
            options={ options }
            loading={<Loader size={'sm'} />}
        >
            {Array.from(new Array(numPages), (el, index) => (
                <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                />
            ))}

        </Document>
    );

};

import React, { useEffect, useState } from 'react';
import { useImportsProductsList } from 'features/import-products-list/hooks/use-imports-products-list';
import { EmptyFileList } from '../../../shared/ui/empy-export-import-list';
import { ImportListSkeleton } from './import-list-skeleton';
import { ImportFilesList } from '../../../shared/ui/import-files-list';
import { typeImportError } from '../../../entities/imports/api/types';
import { ImportFileDialogErrorList } from '../../../shared/ui/import-file-dialog-error-list';
import { typeImportProductsListProps } from '../types/types';
import { Trans } from '@lingui/macro';
import { SidebarTitle } from 'shared/ui/sidebar-title';


export const ImportProductsList: React.FC<typeImportProductsListProps> = ({ onTitleChange }) => {

    const [ errorList, setErrorList ] = useState<null | typeImportError[]>(null);

    useEffect(() => {

        if (errorList?.length && onTitleChange) {

            onTitleChange(<SidebarTitle titleAction={() => {

                setErrorList(null);
                onTitleChange(<Trans>Import terminal</Trans>);

            }}>
                <Trans>Error list</Trans>
            </SidebarTitle>);

        }

    }, [ errorList ]);

    const {
        importList,
        isLoadingImportList,
    } = useImportsProductsList();

    if (isLoadingImportList) {

        return <ImportListSkeleton/>;

    } else if (errorList?.length) {

        return (
            <ImportFileDialogErrorList errorList={errorList} isSidePanel={true}/>
        );

    } else {

        return (
            importList?.length
                ? <ImportFilesList dataList={importList} setErrorList={setErrorList}/>
                : <EmptyFileList/>
        );

    }

};

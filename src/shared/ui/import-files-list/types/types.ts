import { typeImport, typeImportError } from '../../../../entities/imports/api/types';

export interface typeImportFilesListProps {
    dataList: typeImport[]
    setErrorList: (errorList: typeImportError[] | null) => void
}

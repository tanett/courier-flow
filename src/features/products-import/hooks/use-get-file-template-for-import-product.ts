import { useLazyDownloadTemplateFileQuery } from '../../../entities/products/api/api';
import { PRODUCT_IMPORT_CODE } from '../../../entities/products/api/types';


export const useGetFileTemplateForImportProduct = () => {

    const [ getTemplate, { isFetching: isTemplateLoading } ] = useLazyDownloadTemplateFileQuery();

    const onTemplateDownload = async (type: PRODUCT_IMPORT_CODE) => {

        await getTemplate(type);

    };

    return {
        onTemplateDownload,
        isTemplateLoading,
    };

};

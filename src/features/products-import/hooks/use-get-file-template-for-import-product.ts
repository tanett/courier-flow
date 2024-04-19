import { useLazyDownloadTemplateFileQuery } from '../../../entities/products/api/api';
import { PRODUCT_IMPORT_TYPE_FOR_TEMPLATE } from '../../../entities/products/model/state-slice';


export const useGetFileTemplateForImportProduct = () => {

    const [ getTemplate, { isFetching: isTemplateLoading } ] = useLazyDownloadTemplateFileQuery();

    const onTemplateDownload = async (type: PRODUCT_IMPORT_TYPE_FOR_TEMPLATE) => {

        await getTemplate(type);

    };

    return {
        onTemplateDownload,
        isTemplateLoading,
    };

};

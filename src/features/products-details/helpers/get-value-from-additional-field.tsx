import { typeProductAdditionalField } from '../../../entities/products/model/state-slice';


export const getValueFromAdditionalField = (fieldsList: typeProductAdditionalField[], fieldCode: string) => {
    const item = fieldsList.find(field => field.type === fieldCode);

    return item
        ? item.value
        : '-';
};

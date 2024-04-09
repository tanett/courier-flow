import { typeAdditionalFieldForForm, typeProductAdditionalField, typeProductAdditionalFieldInfo } from '../../../entities/products/model/state-slice';

export const mapAdditionalFieldsFromProductToForm = (additionalFieldsFromProduct: typeProductAdditionalField[], additionalFieldsInfo: typeProductAdditionalFieldInfo[]) => {

    const obj:Record<string, typeAdditionalFieldForForm>= {};

    return additionalFieldsInfo.reduce((prev, curr) => {

        const fieldFromProduct = additionalFieldsFromProduct.find(item => item.type === curr.code);
        if (fieldFromProduct) {
            obj[curr.code] = {
                type: curr.code,
                value: fieldFromProduct.value,
                id: fieldFromProduct.id
            };
        } else {
            obj[curr.code] = {
                type: curr.code,
                value: '',
            };
        }

        return obj;
    }, obj)
};

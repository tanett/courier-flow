import { typeAdditionalFieldForForm, typeProductAdditionalField, typeProductEdit } from 'entities/products/model/state-slice';

export const getAdditionalFieldsValue = (fields: typeAdditionalFieldForForm[], fieldsFromData: typeProductAdditionalField[]) => {

    const filteredFieldsFromForm = fields.filter(item=>item.value !== '')

    let value: typeProductEdit['productAdditionalFields'] = {
        deleteAllExisting: true,
        create: filteredFieldsFromForm
    };

    if (filteredFieldsFromForm.length === fieldsFromData.length) {
        const isEqual = filteredFieldsFromForm.every(item => fieldsFromData.findIndex(field => (field.type === item.type && field.value === item.value)) >= 0);
        if (isEqual) {value = undefined;}
    }

    return value;
};

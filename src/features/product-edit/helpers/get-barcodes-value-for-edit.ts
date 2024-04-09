import { typeProductEdit } from 'entities/products/model/state-slice';

export const getBarcodesValueForEdit = (barcodesFromForm: string[], barcodesFromData: string[]) => {

    let value: typeProductEdit['barcodes'];

    if (barcodesFromData.length === 0) {
        value = barcodesFromForm.length === 0
            ? undefined
            : {
                values: barcodesFromForm,
                patchType: 'REPLACE'
            };

    } else {

        if (barcodesFromForm.length === 0) {
            value = {
                values: barcodesFromForm,
                patchType: 'REMOVE'
            };
        } else {
            if (barcodesFromForm.length === barcodesFromData.length) {
                const isEqual = barcodesFromData.every(item => { return barcodesFromForm.findIndex(code => code === item) >= 0; });
                value = isEqual
                    ? undefined
                    : {
                        values: barcodesFromForm,
                        patchType: 'REPLACE'
                    };
            } else {
                value = {
                    values: barcodesFromForm,
                    patchType: 'REPLACE'
                };
            }
        }
    }

    return value;
};

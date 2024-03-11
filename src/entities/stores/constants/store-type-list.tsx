import { t } from '@lingui/macro';
import { STORE_TYPE } from 'entities/stores/model/types';

export const getTransLabelForStoreType = (value: STORE_TYPE) => {

    switch (value){

    case STORE_TYPE.MEDICINE :
        return t`Medicine`;
    case STORE_TYPE.OTHER :
        return t`Other`;
    case STORE_TYPE.FASHION :
        return t`Fashion`;
    case STORE_TYPE.FUEL :
        return t`Fuel`;
    default :return value;

    }

};

export const storeTypeList = [
    { label: getTransLabelForStoreType(STORE_TYPE.OTHER), value: STORE_TYPE.OTHER },
    { label: getTransLabelForStoreType(STORE_TYPE.FUEL), value: STORE_TYPE.FUEL },
    { label: getTransLabelForStoreType(STORE_TYPE.FASHION), value: STORE_TYPE.FASHION },
    { label: getTransLabelForStoreType(STORE_TYPE.MEDICINE), value: STORE_TYPE.MEDICINE }
];

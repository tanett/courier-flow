import { STORE_TYPE } from 'entities/stores/model/types';

export type typeEditStoreForm = {
    name: string,
    phoneNumber: string,
    email: string,
    description: string,
    type: STORE_TYPE,
}

import { typeGetCurrentUserResponse } from '../../api/types';
import { LANGUAGES } from '../../../../app/config/languages';
import { typeRole } from '../../../role/model/types';

export interface typeUserState {
    userProfile?: typeUserProfile
}

export type typeUserProfile = typeGetCurrentUserResponse

export interface typeUserSettings {
    locale: LANGUAGES
}

export interface typeUser {
    id: string
    createdAt: string
    createdBy: string
    archived: boolean
    archivedAt: string
    archivedBy: string
    fullName: string
    role: typeRole
    merchantId: string
    storeIds: string[]
    temporaryPassword: boolean
    username: string
    email: string
    phone: string
    userSettings: typeUserSettings
}

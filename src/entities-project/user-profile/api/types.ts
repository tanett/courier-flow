import { LANGUAGES } from 'app/config/languages';
import { typeUserSettings } from 'app/api/types';
import { typeRole } from '../../role/model/types';

// Get Current User
export interface typeGetCurrentUserResponse {
    actor: {
        id: string,
        createdAt: string,
        createdBy: string,
        archived: boolean,
        archivedAt: string,
        archivedBy: string,
        fullName: string,
        role: typeRole,
        merchantId: string,
        storeIds: string[],
        temporaryPassword: boolean,
        userName: string,
        email: string,
        phone: string,
        userSettings: typeUserSettings
    },
    permissions: string[]
}

export type typePatchCurrentUser = {
    id: string,
    fullName?: string,
    phone?: string | null,
    email?: string,
    userSettings?: {
        locale: LANGUAGES
    }
}

export type typeChangePasswordRequest = {
    userId: string,
    login: string,
    oldPassword: string,
    newPassword: string,
    confirmationCode?: string,
}

export type typeChangePasswordFirstLoginRequest = Pick<typeChangePasswordRequest, 'login'|'oldPassword'|'newPassword'>

export type typeChangePasswordByTokenRequest = Pick<typeChangePasswordRequest, 'confirmationCode' | 'newPassword'>

// Forgot password request
export type typeForgotPasswordRequest = {
    email: string,
}

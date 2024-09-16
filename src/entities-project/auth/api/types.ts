// Request
import { LANGUAGES } from 'app/config/languages';


export interface typeLoginRequest {
    login: string;
    password: string;
}


// Response
export interface iLoginResponse {
    accessToken: string,
    accessTokenIssuedAt: string,
    accessTokenExpiresAt: string,
}

export interface iLoginResponseTransform {
    accessToken: string,
    accessTokenIssuedAt: string,
    accessTokenExpiresAt: string,
    X_CSRF_TOKEN: string,
}

// type role

export interface iUserRole {
    id: string,
    createdAt: string,
    createdBy: string,
    name: string,
    code: string,
    defaultRole: boolean,
    clientRole: boolean,
    accessScope: string,
    merchantId: string,
}

// Get Current User

export interface iGetCurrentUserResponse {
    actor: {
        id: string,
        createdAt: string,
        createdBy: string,
        archived: boolean,
        archivedAt: string,
        archivedBy: string,
        fullName: string,
        role: iUserRole,
        merchantId: string,
        storeIds: string[],
        temporaryPassword: boolean,
        userName: string,
        email: string,
        phone: string,
        userSettings: iUserSettings
    },
    permissions: string[]
}


export interface iUserSettings {
    locale?: 'en' | 'ru';
}

export interface iCreateUser {
    username: string,
    fullName: string,
    roleId: iUserRole['id'],
    email: string,
    userSettings: {
        locale: LANGUAGES
    }
    password?: string,
    temporaryPassword?: boolean,
    phone?: string,
    merchantId?: string,
    storeIds?: string[]
}

export interface iEditUser extends Omit<iCreateUser, 'username' | 'storeIds'> {
    id: number,
    username?: string,
    storeIds?: {
        values: string[],
        patchType: [ 'REPLACE', 'ADD', 'REMOVE' ]
    }
}


export interface iChangePassword {
    userId: number,
    oldPassword: string,
    newPassword: string,
    confirmationCode: string,
}

export interface iChangePasswordByToken {
    secretToken: string,
    newPassword: string,
}

// Forgot password request
export interface iForgotPasswordRequest {
    email: string,
}




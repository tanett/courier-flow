
export interface typeAuthState {
    auth: boolean,
    remoteControl?: boolean
    firstLoginData?: typeFirstLoginData
}

export type typeFirstLoginData = {
    login: string,
    password: string
}

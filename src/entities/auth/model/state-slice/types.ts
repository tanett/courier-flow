
export interface typeAuthState {
    auth: boolean,
    firstLoginData?: typeFirstLoginData
}

export type typeFirstLoginData = {
    login: string,
    password: string
}

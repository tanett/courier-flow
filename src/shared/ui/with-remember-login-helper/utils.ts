const KEY_NAME = 'lastLogins';
const LIST_SIZE = 5;

export const getLastLogins = (): string[] => {

    const dataStr = localStorage.getItem(KEY_NAME);

    if (dataStr) {

        return dataStr.split(';');

    } else {

        return [];

    }

};

export const setLastLogins = (login: string): void => {

    const loginArr = getLastLogins();

    const indexOfLogin = loginArr.findIndex(item => item === login);

    if (indexOfLogin < 0) localStorage.setItem(KEY_NAME, [ login, ...(loginArr.slice(0, LIST_SIZE - 1)) ].join(';'));

    if (indexOfLogin === 0) return;

    if (indexOfLogin > 0) {

        localStorage.setItem(KEY_NAME, [ login, ...(loginArr.splice(indexOfLogin, 1).slice(0, LIST_SIZE - 1)) ].join(';'));

    }

};

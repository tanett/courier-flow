export const isHavePermissions = (userPermissions: string[], availablePermissions: string[]) => {

    let result = false;

    for (let i = 0; i < userPermissions.length; i++) {

        if (availablePermissions.includes(userPermissions[ i ])) {

            result = true;
            break;

        }

    }

    return result;

};

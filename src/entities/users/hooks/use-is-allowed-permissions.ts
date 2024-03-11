import { useUserPermissions } from '../../../entities/users/hooks/use-user-permissions';
import { isHavePermissions } from 'shared/utils/is-have-permissions';

export const useIsAllowedPermissions = (availablePermissions: string[]) => {

    const userPermissions = useUserPermissions();

    return isHavePermissions(userPermissions, availablePermissions);

};

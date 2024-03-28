import { isHavePermissions } from 'shared/utils/is-have-permissions';
import { useSelectorT } from 'app/state';

export const useIsAllowedPermissions = (availablePermissions: string[]) => {

    const userPermissions = useSelectorT(state => state.userProfile.userProfile?.permissions);

    return userPermissions ? isHavePermissions(userPermissions, availablePermissions) : null;

};

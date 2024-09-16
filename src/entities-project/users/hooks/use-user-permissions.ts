import { useSelectorT } from 'app/state';

export const useUserPermissions = () => {

    return useSelectorT(state => state.userProfile.userProfile?.permissions) || [];

};

import { useUserToArchiveMutation } from '../../../entities/users/api/api';
import { typeUserToArchive } from '../../../entities/users/model/types';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from '../../../app/config/router-paths';

export function useUserToArchive(closeDialogHandler: () => void) {

    const navigate = useNavigate();

    const [ archiveUser, { isLoading } ] = useUserToArchiveMutation();

    const userToArchive = (id: string) => {

        const dataObject: typeUserToArchive = [ id ];

        // TODO: fix it
        // navigate(routerPaths.users);

        archiveUser(dataObject);

        closeDialogHandler();

    };

    return { userToArchive, isLoading };

}

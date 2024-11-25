import { useArchiveDevicesMutation } from '../api/api';
import { useState } from 'react';
import { typeDevice } from '../model/types';

export const useDevicesToArchiveForTable = () => {

    const [ deviceToArchive, { isLoading: isArchiveDeviceLoader } ] = useArchiveDevicesMutation();
    const [ deviceToArchiveObj, setDeviceToArchiveObj ] = useState<null | typeDevice>(null);


    const onConfirmArchiveDevice = () => {

        if (deviceToArchiveObj) deviceToArchive([ deviceToArchiveObj.id ]);

        setDeviceToArchiveObj(null);

    };


    return {
        confirmationArchivedDevice: deviceToArchiveObj,
        onCloseArchivedDeviceConfirmPopup: () => setDeviceToArchiveObj(null),
        onOpenArchivedDeviceConfirmPopup: (device: typeDevice) => setDeviceToArchiveObj(device),
        onConfirmArchivedDeviceHandler: onConfirmArchiveDevice,
        isArchivedDeviceLoader: isArchiveDeviceLoader,
    };

};

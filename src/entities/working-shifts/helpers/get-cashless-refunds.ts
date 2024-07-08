import { typeWorkingShifts } from '../model/types';

export const getCashlessRefunds = (data: typeWorkingShifts) => {
    return (data.totalOtherRefunds || 0) + (data.totalCardRefunds || 0) + (data.totalTransferRefunds || 0) + (data.totalQRRefunds || 0);
};

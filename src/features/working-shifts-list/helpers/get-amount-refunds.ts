import { typeWorkingShifts } from '../../../entities/working-shifts/model/types';

export const getAmountRefunds = (data: typeWorkingShifts) => {
    return (data.totalOtherRefunds || 0) + (data.totalCardRefunds || 0) + (data.totalTransferRefunds || 0) + (data.totalQRRefunds || 0) + (data.totalCashRefunds || 0);
};

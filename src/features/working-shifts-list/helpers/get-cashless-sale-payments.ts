import { typeWorkingShifts } from '../../../entities/working-shifts/model/types';

export const getCashlessSalePayments = (data: typeWorkingShifts) => {
    return (data.totalOtherIncome || 0) + (data.totalCardIncome || 0) + (data.totalTransferIncome || 0) + (data.totalQRIncome || 0);
};

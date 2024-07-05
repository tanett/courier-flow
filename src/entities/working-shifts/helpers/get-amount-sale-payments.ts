import { typeWorkingShifts } from '../model/types';

export const getAmountSalePayments = (data: typeWorkingShifts) => {

    return (data.totalOtherIncome || 0) + (data.totalCardIncome || 0) + (data.totalTransferIncome || 0) + (data.totalQRIncome || 0) + (data.totalCashIncome || 0);
};

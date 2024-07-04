import { typeWorkingShifts } from '../../../entities/working-shifts/model/types';
import { getAmountSalePayments } from './get-amount-sale-payments';
import { getAmountRefunds } from './get-amount-refunds';

export const getTotalCost = (item: typeWorkingShifts)=>{
    return(getAmountSalePayments(item)-getAmountRefunds(item));
}

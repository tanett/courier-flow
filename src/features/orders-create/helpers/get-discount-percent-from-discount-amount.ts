export const getDiscountPercentFromDiscountAmount = (discount: number, totalCost: number)=>{

    return parseFloat(((discount * 100) / totalCost).toFixed(2));
}

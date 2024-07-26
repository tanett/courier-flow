export const getDiscountPercentFromDiscountAmount = (discount: number, totalCost: number)=>{

    return (discount * 100) / totalCost;
}

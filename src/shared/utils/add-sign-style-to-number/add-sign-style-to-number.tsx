export const addSignStyleToNumber = (number: number, negativeSignClass: string, positiveSignClass?: string) => {

    const isNegative = number < 0;

    return <div>
        {isNegative && negativeSignClass && <span className={negativeSignClass}>-</span>}
        {!isNegative && positiveSignClass && <span className={positiveSignClass}>+</span>}
        <span>{Math.abs(number).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
        })}</span>
    </div>;

};

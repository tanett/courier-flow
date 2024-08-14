export const addSignStyleToNumber = (number: number, negativeSignClass: string, positiveSignClass?: string) => {

    const isNegative = number < 0;

    return <>
        {isNegative && negativeSignClass && <span className={negativeSignClass}>-</span>}
        {!isNegative && positiveSignClass && <span className={positiveSignClass}>+</span>}
        <span>{Math.abs(number)}</span>
    </>;

};

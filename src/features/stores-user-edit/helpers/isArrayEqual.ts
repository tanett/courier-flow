export const isArrayEqual = (array1: string[], array2: string[]) => {

    if (array1.length === array2.length){

        return array1.every(item => array2.includes(item));

    }
    return false;

};

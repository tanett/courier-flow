export const stringToBoolean = (value: unknown) => {

    if (typeof value === 'string' && value.toLowerCase() === 'true') return true;
    if (typeof value === 'string' && value.toLowerCase() === 'false') return false;
    return null;

};
